import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
} from 'react-native';

import RefreshableListView from 'v2ex/src/widget/listview/RefreshableListView';
import Icon from 'react-native-vector-icons/Ionicons';
import * as V2exAPI from 'v2ex/src/service/V2exAPI';
import * as DateUtil from 'v2ex/src/lib/DateUtil';
import style from 'v2ex/src/module/topic/style/TopicList';

import TopicDetail from 'v2ex/src/module/topic/component/TopicDetail';

export default class TopicList extends Component {
	static defaultProps = {
		refreshable 	: true,
		pagination	 	: false
  	}
	fetchData = (page, success, error) => {
		this.props.tab && V2exAPI.tabTopics(this.props.tab).then((data)=>{
			success(data)
		}).catch(()=>error());
		this.props.node && V2exAPI.nodeTopics(this.props.node, page).then((data)=>{
			success(data)
		}).catch(()=>error());
		this.props.latest && V2exAPI.latestTopics(page).then((data)=>{
			success(data)
		}).catch(()=>error());
	}
	onItemPress = (rowData) => {
		this.props.navigator.push({
			component : TopicDetail,
			params : rowData
		})
	}
	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		return (
			<TouchableHighlight onPress={()=>{this.onItemPress(rowData)}} underlayColor='#ccc'>
				<View style={style.row}>
					<View style={style.rightWrap}>
						<Text style={style.title} numberOfLines={2}>{rowData.title}</Text>
						<View style={{height: 20,flexDirection: 'row'}}>
							<View style={style.nodeWrap}>
								{rowData.node && rowData.node.title && <Text style={style.node}>{rowData.node.title}</Text>}
								{rowData.time && <Icon name='ios-time-outline' size={12} />}
								{rowData.time && <Text style={style.time}>{rowData.time ? rowData.time : DateUtil.formatTimeStrByNow(rowData.last_modified)}</Text>}
								<Icon name='ios-chatbubbles-outline' size={12} />
								<Text style={style.replies}>{rowData.replies}</Text>
							</View>
						</View>
					</View>
					<View style={style.user}>
						<Image source={{uri: 'http:' + rowData.avatar}} style={style.avatar}/>
						<Text style={style.username} numberOfLines={1}>{rowData.member.username}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)	
	}
	renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => {
		return <View key={rowID} style={style.separator} />
	}
	render() {
		return (
			<RefreshableListView 
				fetchData={this.fetchData}
				renderRow={this.renderRow}
				renderSeparator={this.renderSeparator}
				{...this.props}
			/>
		)
	}
}