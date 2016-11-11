/**
 *
 * Props:
 * 	refreshable 	: true, // 是否下拉, 默认true
 *	pagination	 	: true, // 是否分页, 默认true
 *	autoLoadMore 	: true,
 *	displayStatus   : {
 *		'wait':'点击加载更多',
 *		'loading':'加载中...',
 *		'error':'加载失败，点击重新加载',
 *		'done':'已经没有更多了'
 *	},
 *  controlProps  	: {} 	// 下拉控制属性
 *  dataSource : ListView.DataSource
 *  // 加载数据方法, 回传page给加载函数，
 *  // 加载成功回调接受rows(新增的row)currCount(当前数据条数，兼容一个数据多个row的情况)totalCount(总数据条数)
 *  fetchData  : function(page, function(rows, currCount, totalCount){
 * 		// 成功回调
 *  }, function(){
 * 		// 错误回调
 *  })
 *
 *  注: 只有fetchData参数是必须的。
 *
 */
'use strict'

import React, {Component} from 'react';
import {
	View,
	Text,
	Image,
    ListView,
	RefreshControl,
	TouchableHighlight,
	ActivityIndicator,
	InteractionManager
} from 'react-native';

class RefreshableListView extends Component {
	constructor(props){
		super(props);

		this.state = {
			dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			status : 'wait',
			isRefreshing : false,
			isEmpty : false,
			isError : false
		}
		this.totalCount = 0;
		this.page = 1;
		this.listViewHeight = 0;
		this.filled = false;

		this.onPullRefresh = this._onPullRefresh.bind(this);
		this.onLoadMore    = this._onLoadMore.bind(this);
		this.renderFooter  = this._renderFooter.bind(this);
		this.handleEndReached = this._handleEndReached.bind(this);
	}
	static defaultProps = {
		refreshable 	: true,
		pagination	 	: true,
		autoLoadMore 	: true,
		autoRefresh		: true,
		dataSource		: undefined,
		displayStatus : {
			'wait':'点击加载更多',
			'loading':'加载中...',
			'error':'加载失败，点击重新加载',
			'done':'已经没有更多了'
		}
  	}
	static propTypes = {
		refreshable 	: React.PropTypes.bool, 				// 是否下拉, 默认true
		pagination	 	: React.PropTypes.bool,					// 是否分页, 默认true
		fetchData		: React.PropTypes.func.isRequired,		// 加载数据方法
		controlProps	: React.PropTypes.object,				// 下拉控制器其他属性
		dataSource 		: React.PropTypes.object,				// 数据
		autoLoadMore	: React.PropTypes.bool,					// 自动加载更多(不需要点击), 默认true
		autoRefresh		: React.PropTypes.bool,					// 进入页面自动加载
		displayStatus 	: React.PropTypes.object,
		renderRefreshControl : React.PropTypes.func,
		renderEmpty			 : React.PropTypes.func,
		renderError			 : React.PropTypes.func
	}
	componentDidMount() {
		if(this.props.autoRefresh){
			InteractionManager.runAfterInteractions(() => {
				this.setState({isRefreshing : true});
				this._onPullRefresh();
			});
		}
	}
	getWrappedInstance(){
		return this.refs.listview;
	}
	pullRefresh(){
		this.refs.listview.scrollTo({x: 0, y: 0, animated:false});
		this.setState({isRefreshing : true});
		this._onPullRefresh();
	}
	_onPullRefresh(){
		this.page = 0;
		this.filled = false;
		this._onRefresh();
	}
	_onLoadMore(){
		if(this.state.status !== 'loading' && this.state.isRefreshing == false){
			this.setState({status : 'loading'});
			this._onRefresh();
		}
	}
	_onRefresh() {
		this.props.fetchData(this.page + 1, (rows, currCount, totalCount) => {
			this.totalRowCount = currCount;
			this.totalCount = totalCount;
			if(rows != null || rows != undefined){
				if(this.page == 0){
					this.setRows(rows);
				}else{
					this.appendRows(rows);
				}
			}else{
				this.setState({
					status : this.totalRowCount >= this.totalCount ? 'done' : 'wait',
					isRefreshing : false
				});
			}
			this.totalCount = totalCount;
			this.page++;
		}, () => {
			this.setState({
				isError : this.page == 0 ? true : false,
				status : 'error',
				isRefreshing : false
			});
		});
	}
    // 手动重新加载数据
	reloadData(){
		this._onPullRefresh();
	}
	updateStuatus(status){
		this.setState({'status' : status});
	}
	getRows(sectionIdentitie){
		if(sectionIdentitie != undefined){
			return this.state.dataSource._dataBlob[sectionIdentitie];
		}
		let sections = this.getSectionIdentities();
		if(sections != undefined && sections.length > 0){
			return this.state.dataSource._dataBlob[sections[0]];
		}
		return null;
	}
	setRows(rows){
		this.setState({
			isEmpty: rows.length == 0,
			status : this.totalRowCount >= this.totalCount ? 'done' : 'wait',
			isRefreshing : false,
			dataSource : this.state.dataSource.cloneWithRows(rows)
		});
	}
	appendRows(rows){
		var newRows = this.getRows().concat(rows);
		this.setRows(newRows);
	}
	updateRowAt(index, rowData, sectionId, animation){
		const rows = this.getRows();
		rows[index] = rowData;
		this.setState({
			dataSource : this.state.dataSource.cloneWithRows(rows)
		});
	}
	getSectionIdentities(){
		return this.state.dataSource.sectionIdentities;
	}
	setPage(page){
		this.page = page;
	}
	getPage(){
		return this.page;
	}
	_renderRefreshControl(){
		if(this.props.renderRefreshControl)return this.props.renderRefreshControl({
			onRefresh : this.onPullRefresh,
			refreshing : this.state.isRefreshing
		});
		return (
			<RefreshControl
				onRefresh={this.onPullRefresh}
				refreshing={this.state.isRefreshing}
				{...this.props.controlProps}
			/>
		)
	}
	_handleEndReached(){
		if (this.state.dataSource.getRowCount() > 0 &&
		 this.props.autoLoadMore && this.props.pagination && this.state.status != 'done' && this.filled){
			this._onLoadMore();
		}
	}
	_renderEmpty(){
		if(this.props.renderEmpty)return this.props.renderEmpty();
		return (
			<View style={{height:300,justifyContent:'center',alignItems:'center'}}>
				<Text style={{color:'#B8B8B8',fontSize:14,marginTop:10}}>暂无数据</Text>
			</View>
		)
	}
	_renderError(){
		if(this.props.renderError)return this.props.renderError();
		return (
			<View style={{height:300,justifyContent:'center',alignItems:'center'}}>
				<Text style={{color:'#B8B8B8',fontSize:14,marginTop:10}}>请求错误</Text>
			</View>
		)
	}
	_renderFooter(){
		if(this.state.isEmpty==true){
			return this._renderEmpty();
		} else if(this.state.isError){
			return this._renderError();
		}else {
			if(this.state.dataSource.getRowCount() > 0 && this.props.pagination){
				if(this.state.status == 'loading'){
					return (
						<View style={{
							height:50,
							flexDirection:'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}>
							<ActivityIndicator animating={true} size="small" />
							<Text style={{marginLeft: 5, fontSize:14}}>
								{this.props.displayStatus[this.state.status]}
							</Text>
						</View>
					)
				} else if(!this.props.autoLoadMore || !this.filled || this.state.status == 'done' || this.state.status == 'error') {
					return (
						<TouchableHighlight
							style={{height:50, justifyContent:'center',alignItems:'center'}}
							underlayColor='#c8c7cc'
							disabled={this.state.status == 'done'}
							onPress={this.onLoadMore}>
							<Text style={{fontSize:14}}>
								{this.props.displayStatus[this.state.status]}
							</Text>
						</TouchableHighlight>
					)
				}
			}
		}
		return null;
	}
	render(){
		return (
		<ListView
			enableEmptySections={true}
			{...this.props}
			ref='listview'
			dataSource={this.props.dataSource ? this.props.dataSource : this.state.dataSource}
        	renderFooter={this.renderFooter}
			refreshControl={this.props.refreshable === true ? this._renderRefreshControl() : null}
			onEndReached={this.handleEndReached}
			onLayout={(event)=>{
				var layout = event.nativeEvent.layout;
				this.listViewHeight = layout.height;
			}}
			onContentSizeChange={(width, height)=>{
				if(height >= this.listViewHeight && this.listViewHeight != 0){
					this.filled = true;
				}else{
					this.filled = false;
				}
			}}
			 >
		</ListView>
		)
	}
}

export default RefreshableListView;
