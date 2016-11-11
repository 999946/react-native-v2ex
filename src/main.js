
'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
// CodePush
// import codePush from "react-native-code-push";
import store from "v2ex/src/redux/Store";

import Navigation from "v2ex/src/module/navigation/component/Navigation";

// log 屏蔽(发布时打开注释)
if(!__DEV__) console.log = ()=>{};
console.disableYellowBox = true;
export default class App extends Component {
	componentDidMount() {
		// 更新代码
		//codePush.sync();
    }
    render() {
        return (
			<Provider store={store}>
				<Navigation />
			</Provider>
        );
    }
}