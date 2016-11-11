
import React, {Component} from 'react'
import {Navigator, View, StyleSheet, Platform, BackAndroid} from 'react-native';

import Index from "v2ex/src/module/index/component/Index";

export default class Navigation extends Component {
	constructor(props){
		super(props);
		// if (Platform.OS === 'android') {
		// 	BackAndroid.addEventListener('hardwareBackPress', () => {
		// 		let nav = this.refs.navigator;
		// 		const currRoutes = nav.getCurrentRoutes();
		// 		if (currRoutes.length > 0) {
		// 			if(global.isShowPopup == false || global.isShowPopup == undefined){
		// 				nav.pop();
		// 				return true;
		// 			}
		// 			return true;
		// 		}
		// 		return false;
		// 	});
		// }
	}
	configureScene = (route) => {
		if (route.sceneConfig) {
			return route.sceneConfig;
		}
		return Navigator.SceneConfigs.PushFromRight;
	}
	renderScene = (route, navigator) => {
		let Component = route.component;
		return <Component navigator={navigator} params={route.params}/>
	}
	render() {
		return (
				<Navigator
					initialRoute={{component: Index }}
					configureScene={this.configureScene}
					renderScene={this.renderScene}
				/>
        );
	}
}
