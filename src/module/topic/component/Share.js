import React, { Component } from 'react';

import {
	Clipboard
} from 'react-native';

import * as WechatAPI from 'react-native-wechat';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';

export default class Share extends Component {
	show() {
		this.ActionSheet.show();
	}
	_share = (index) => {
		if (index == 2) {
			WechatAPI.shareToSession({
				type: 'news',
				title: '标题',
				description: '描述',
				webpageUrl: 'https://github.com/reactnativecn/react-native-wx',
				imageUrl: 'http://www.ncloud.hk/email-signature-262x100.png'
			});
		}
		if (index == 2) {
			Clipboard.setString('https://github.com/reactnativecn/react-native-wx')
		}
	}
	render() {
		return <ActionSheet
			ref={(ref) => this.ActionSheet = ref}
			options={['取消', '分享到微信', '复制网址']}
			cancelButtonIndex={0}
			onPress={this._share}
			/>
	}
}
