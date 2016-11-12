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
		if(this.props.data){
			if (index == 1) {
				WechatAPI.shareToSession({
					type: 'news',
					title: this.props.data[0].title,
					description: '',
					webpageUrl: this.props.data[0].url,
					imageUrl: this.props.data[0].member.avatar_normal
				});
			}
			if (index == 2) {
				Clipboard.setString(this.props.data.url)
			}
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
