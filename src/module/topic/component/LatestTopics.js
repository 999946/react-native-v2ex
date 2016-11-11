import React, { Component } from 'react';
import {
	View
} from 'react-native';

import Navbar from 'v2ex/src/widget/Navbar';
import TopicList from 'v2ex/src/module/topic/component/TopicList';

export default class LatestTopics extends Component {
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<Navbar 
					title='最新'
					navigator={this.props.navigator}
					/>
				<TopicList 
					navigator={this.props.navigator}
					latest={true}
					refreshable={true}
					pagination={true}
					/>
			</View>
		)
	}
}