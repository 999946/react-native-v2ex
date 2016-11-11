import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import Navbar from 'v2ex/src/widget/Navbar';
import TopicList from 'v2ex/src/module/topic/component/TopicList';

export default class NodeTopics extends Component {
	
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<Navbar 
					title={this.props.params.title}
					navigator={this.props.navigator}
					/>
				<TopicList 
					navigator={this.props.navigator}
					node={this.props.params.node}
					refreshable={true}
					pagination={true}
					/>
			</View>
		)
	}
}