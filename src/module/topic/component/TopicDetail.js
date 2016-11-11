import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Dimensions,
	InteractionManager,
	Linking
} from 'react-native';
import Navbar from 'v2ex/src/widget/Navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DateUtil from 'v2ex/src/lib/DateUtil';
import style from 'v2ex/src/module/topic/style/TopicDetail';
const {width, height} = Dimensions.get('window');
import HtmlView from 'v2ex/src/widget/htmlView/HtmlView';
import * as V2exAPI from 'v2ex/src/service/V2exAPI';
import CustomImage from 'v2ex/src/widget/htmlView/ResizeImage';
import RefreshableListView from 'v2ex/src/widget/listview/RefreshableListView';
import * as Animatable from 'react-native-animatable';
import Share from './Share';
import ReplyView from './ReplyView';
import ImageGallery from 'v2ex/src/module/common/ImageGallery';
import NodeTopics from 'v2ex/src/module/nodes/component/NodeTopics';

import * as topicActions from '../action/Topic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TopicDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			galleryVisible : false,
			image : undefined,
			value : undefined // 评论框内容
		}
		this.showTitle = false;
		this.animating = false;
	}
	componentDidMount(){
		InteractionManager.runAfterInteractions(() => {
			if(this.props.detail == undefined){
				this.props.actions.getTopicDetail(this.props.params.id);
			}
			this.replies.pullRefresh();
		});
	}
	onTitlePress = () => {
		if(this.titleBar && this.animating ==  false && this.showTitle == true){
			this._hideTitle();
		}
		if(this.titleBar && this.animating ==  false  && this.showTitle == false){
			this._showTitle();
		}
	}
	_showTitle(){
		// this.replies.getWrappedInstance().scrollTo({x: 0, y: 0, animated:false});
		this.showTitle = true;
		this.animating = true;
		this.titleBar.transition({height: 0,opacity:0, paddingVertical: 0}, {height: 80,opacity:1, paddingVertical: 8}, 200, 'ease-in');
		setTimeout(() =>{
			this.animating = false;
		}, 600);
	}
	_hideTitle(){
		this.showTitle = false;
		this.animating = true;
		this.titleBar.transition({height: 80,opacity:1,paddingVertical: 8}, {height: 0,opacity:0,paddingVertical: 0}, 200, 'ease-in');
		setTimeout(() =>{
			this.animating = false;
		}, 600);
	}
	onNodePress = (node) =>{
		this.props.navigator.push({
			component : NodeTopics,
			params : {title : node.title, node : node.name}
		})
	}
	onRowPress = (rowData) => {
		this.at(rowData);
		this.replyView.getInput().focus();
	}
	onAvatarLongPress = (rowData) => {
		this.at(rowData);
	}
	at = (rowData) => {
		const value = this.state.value == undefined ? '' : this.state.value
		this.setState({
			value : value + `@${rowData.member.username} `
		});
	}
	onThanksPress = (rowData) => {
		V2exAPI.thankReply(this.props.params.id, rowData.id)
		.then((success)=>{
			if(success){
				this.replies.reloadData();
			}
		});
	}
	onLinkPress = (node) =>{
		if(node.attribs.href){
			if(node.attribs.href.startsWith('/member/')){
				// TODO 个人信息页
			}else{
				Linking.openURL(node.attribs.href);
			}
		}
	}
	onImagePress = (node, width, height)=>{
		this.setState({
			galleryVisible : true,
			image : {
				url : node.attribs.src,
				width: width,
				height : height
			}
		});
	}
	fetchData = (page, success, error) => {
		V2exAPI.replies(this.props.params.id, 1, 10).then((data)=>{
			success(data)
		})
	}
	renderNavbar = () => {
		return (
			<Navbar 
				title={
					<TouchableWithoutFeedback 
						onPress={this.onTitlePress}>
						<View style={{
							height: 35,
							width: width - 100,
							flexWrap: 'nowrap',
							justifyContent:'flex-end',
							alignItems: 'center'
						}}>
						<Text numberOfLines={1}>{this.props.params.title}</Text>
						<Animatable.View ref={ref => this.titleArrow = ref}>
							<Icon name="md-arrow-dropdown" size={10} />
						</Animatable.View>
						</View>
					</TouchableWithoutFeedback>
				}
				navigator={this.props.navigator}
				rightButton={
					<TouchableOpacity
						style={style.rightNavBtn}
						hitSlop={{top: 0, left: 80, bottom: 0, right: 30}}
						onPress={()=>{this.share.show();}} >
						<Icon name='ios-more-outline' size={22}/>
					</TouchableOpacity>
				}
				/>
		)
	}
	renderTitle = () => {
		const data = this.props.detail[0];
		return (
			<Animatable.View 
				ref={ref => this.titleBar = ref}
				style={style.titleBar}>
				<View style={style.rightWrap}>
					<Text style={style.title} numberOfLines={2}>{data.title}</Text>
					<View style={{height: 20,flexDirection: 'row'}}>
						<View style={style.nodeWrap}>
							{data.node && data.node.title && 
								<TouchableOpacity onPress={()=>this.onNodePress(data.node)}>
									<Text style={style.node}>{data.node.title}</Text>
								</TouchableOpacity>}
							{data.created && <Icon name='ios-time-outline' size={12} />}
							{data.created && <Text style={style.title_time}>{DateUtil.formatTimeStrByNow(data.created) + '发表'}</Text>}
						</View>
					</View>
				</View>
				<View style={style.user}>
					<Image source={{uri: 'http:' + data.member.avatar_normal}} style={style.title_avatar}/>
					<Text style={style.title_username} numberOfLines={1}>{data.member.username}</Text>
				</View>
			</Animatable.View>
		)
	}
	renderHeader = () => {
		return (
			<View>
				<If condition={ this.props.detail }>
					<View style={{flex:1}}>
						<HtmlView
							style={{paddingHorizontal: 10}}
							html={'<div>' + this.props.detail[0].content_rendered + '</div>'}
							maxWidth={width-20}
							onLinkPress={this.onLinkPress}
							onImagePress={this.onImagePress}
							/>
					</View>
					<View style={style.replies_herader}>
						<Text>评论</Text>
					</View>
				</If>
			</View>
		)
	}
	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		return (
			<TouchableHighlight onPress={()=>{this.onRowPress(rowData)}} underlayColor='#ccc'>
				<View style={style.row}>
					<TouchableWithoutFeedback onLongPress={()=>{this.onAvatarLongPress(rowData)}}>
						<Image 
							style={style.avatar} 
							source={{uri:'http:'+rowData.member.avatar_mini}}  />
					</TouchableWithoutFeedback>
					<View style={style.right_wrap}>
						<View style={style.row_header}>
							<Text style={style.username}>{rowData.member.username}</Text>
							<Text style={style.time}>{DateUtil.formatTimeStrByNow(rowData.last_modified)}</Text>
							<TouchableOpacity onPress={()=>this.onThanksPress(rowData)}>
								<View style={{flexDirection: 'row',alignItems:'center'}}>
									<Icon name='md-heart' size={10} color='red'/>
									<Text style={style.thanks}>{rowData.thanks}</Text>
								</View>
							</TouchableOpacity>
						</View>
						<HtmlView
							html={'<div>'+rowData.content_rendered+'</div>'}
							onLinkPress={this.onLinkPress}
							onImagePress={this.onImagePress}
							maxWidth={width - 60}
							/>
					</View>
				</View>
			</TouchableHighlight>
		)	
	}
	renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
		return <View key={rowID} style={style.separator} />
	}
	renderEmpty(){
		return (
			<View style={{height:45,justifyContent:'center',alignItems:'center'}}>
				<Text style={{color:'#B8B8B8',fontSize:14,marginTop:10}}>暂无评论</Text>
			</View>
		)
	}
	renderError(){
		return (
			<View style={{height:45,justifyContent:'center',alignItems:'center'}}>
				<Text style={{color:'#B8B8B8',fontSize:14,marginTop:10}}>请求错误</Text>
			</View>
		)
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				{this.renderNavbar()}
				<If condition={ this.props.detail }>
					{this.renderTitle()}
				</If>
				<RefreshableListView 
					ref={(ref)=>this.replies = ref}
					style={style.list}
					fetchData={this.fetchData}
					renderHeader={this.renderHeader}
					renderRow={this.renderRow}
					refreshable={true}
					pagination={false}
					renderSeparator={this.renderSeparator}
					initialListSize={10}
					pageSize={10}
					autoRefresh={false}
					renderEmpty={this.renderEmpty}
					renderError={this.renderError}
					onScroll={(e)=>{
						if(this.animating ==  false && this.showTitle == true){
							this._hideTitle();
						}
					}}
					{...this.props}
				/>
				<Share ref={ref => this.share = ref} data={this.state.data}/>
				<ReplyView 
					ref={ref=>this.replyView = ref}
					value={this.state.value}
					onCancel={()=>this.replyView.getInput().blur()}
					onSubmit={()=>{
						this.replyView.getInput().blur();
						this.props.actions.reply(this.props.params.id, this.state.value);
					}}
					onChangeText={(value)=>{
						this.setState({value});
					}}
				/>
				<ImageGallery 
					ref={ref => this.imageGallery = ref} 
					visible={this.state.galleryVisible}
					image={this.state.image}
					cancel={()=>this.setState({
						galleryVisible : false
					})}
				/>
			</View>
		)
	}
}

function mapStateToProps(state, ownProps) {
	const topic = state.topic.detail[ownProps.params.id];
	return {
		detail: topic != undefined ? topic.detail : undefined
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(topicActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);