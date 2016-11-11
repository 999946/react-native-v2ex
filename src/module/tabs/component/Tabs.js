import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	InteractionManager,
	Dimensions,
	Platform
} from 'react-native';

import style from 'v2ex/src/module/tabs/style/Tabs';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from 'v2ex/src/widget/ScrollableTabBar';

import TopicList from 'v2ex/src/module/topic/component/TopicList';
import TopicDetail from 'v2ex/src/module/topic/component/TopicDetail';

const {width, height} = Dimensions.get('window');

export default class Tabs extends Component {
	renderTabBar = () => {
		let tabBarStyle = Platform.select({
      		ios: {
				height:35,
				position: 'absolute',
				top : -45,
				left : 30,
				right : 0,
				borderBottomWidth:0
			},
			android: {
				height:35,
				width : width,
				borderBottomWidth:0
			}
		});
		return (
			<ScrollableTabBar
				underlineHeight={2}
				tabsContainerStyle={style.tabsContainerStyle}
				style={tabBarStyle}
				renderTab={this.renderTab}
			/>
		)
	}
	renderTab = (isTabActive, title, page) => {
		const textColor = isTabActive ? '#2fbdc8' : '#999';
		const fontWeight = isTabActive ? 'bold' : 'normal';
		return (
			<TouchableOpacity style={{width:75, height:35}} activeOpacity={1}>
				<View style={[style.tabStyle]}>
					<Text style={{color: textColor, fontWeight: fontWeight ,fontSize:12}}>
					{title}
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
	render() {
		return (
			<View
				style={{flex:1,backgroundColor:'#fff'}} 
				>
				<ScrollableTabView
					tabBarPosition='top'
					scrollWithoutAnimation={false}
					renderTabBar={this.renderTabBar}
					>
					<TopicList
						tabLabel="技术"
						navigator={this.props.navigator}
						tab='tech'
						/>
					<TopicList
						tabLabel="创意"
						navigator={this.props.navigator}
						tab='creative'
						/>
					<TopicList
						tabLabel="好玩"
						navigator={this.props.navigator}
						tab='play'
						/>
					<TopicList
						tabLabel="Apple"
						navigator={this.props.navigator}
						tab='apple'
						/>
					<TopicList
						tabLabel="酷工作"
						navigator={this.props.navigator}
						tab='jobs'
						/>
					<TopicList
						tabLabel="交易"
						navigator={this.props.navigator}
						tab='deals'
						/>
					<TopicList
						tabLabel="城市"
						navigator={this.props.navigator}
						tab='city'
						/>
					<TopicList
						tabLabel="问与答"
						navigator={this.props.navigator}
						tab='qna'
						/>
					<TopicList
						tabLabel="最热"
						navigator={this.props.navigator}
						tab='hot'
					/>
					<TopicList
						tabLabel="全部"
						navigator={this.props.navigator}
						tab='all'
					/>
					<TopicList
						tabLabel="R2"
						navigator={this.props.navigator}
						tab='r2'
					/>
				</ScrollableTabView>
			</View>
		);
	}
}
