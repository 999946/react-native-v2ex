import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	Text,
	Linking,
	View
} from 'react-native';

import Navbar from 'v2ex/src/widget/Navbar';
import HtmlView from 'v2ex/src/widget/htmlView/HtmlView';
import DeviceInfo from 'react-native-device-info';
import { apiDomain, apiHost } from 'v2ex/src/config';

export default class About extends Component {
	onLinkPress(node){
		Linking.openURL(node.attribs.href);
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<Navbar 
					title='关于'
					navigator={this.props.navigator}
				/>
				<View
					style={{flex:1, alignItems: 'center'}} 
					>
					<Image 
						source={{uri:`${apiDomain}/static/apple-touch-icon.png`}} 
						style={{marginTop:50, width: 120,height: 120}}
						/>
					<Text
						style={{marginTop: 20}}
						>
						版本: {DeviceInfo.getVersion()}
					</Text>
					<HtmlView
						style={{marginTop: 8}}
						html={'<p><a href="https://github.com/999946/react-native-v2ex">项目源码</a></p>'}
						onLinkPress={this.onLinkPress}
					/>
				</View>
			</View>
		)
	}
}