import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image
} from 'react-native';
import style from '../style/Menu';
import Icon from 'react-native-vector-icons/Ionicons';

import Nodes from 'v2ex/src/module/nodes/component/Nodes';
import Login from 'v2ex/src/module/user/component/Login';
import LatestTopics from 'v2ex/src/module/topic/component/LatestTopics';
import About from 'v2ex/src/module/common/About';

import { apiHost } from 'v2ex/src/config';

import * as drawerActions from '../action/Drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Menu extends Component {
	componentDidMount() {
		
	}
	onPress = (index) => {
		let component = null;
		switch (index) {
			case 1:
				component = LatestTopics;
				break;
			case 2:
				component = Nodes;
				break;
			case 3:
				component = About;
				break;
			default:
				break;
		}
		if(component){
			this.props.navigator.push({
				component : component
			});
			this.props.actions.close();
		}
	}
	onLoginPress = () => {
		if(!this.props.isLogined){
			this.props.navigator.push({
				component : Login
			});
		}else{
			this.props.onLogout();
		}
	}
	render() {
		let {isLogined} = this.props;
		let { avatar, username } = this.props.user;
		avatar = !isLogined ? null : 'http:'+avatar;
		username = !isLogined ? '点击登录' : this.props.user.username;

		return (
			<View
				style={{flex:1,backgroundColor:'dimgray'}} 
				>
				<View style={style.header} >
					<TouchableOpacity  style={style.user} onPress={this.onLoginPress}>
						<View style={{alignItems: 'center'}}>
							{ avatar ? 
								<Image 
								style={style.avatar}
								source={{uri:avatar}} />
								:
								<Icon name='ios-contact' size={40}/>
							}
							<Text style={style.username}>{username}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View
					style={style.menu} 
					>
					<TouchableOpacity 
						style={style.item} 
						disabled={!isLogined} 
						onPress={()=>this.onPress(1)}>
						<Text style={[style.title, !isLogined && style.item_disabled]}>最新</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.item} onPress={()=>this.onPress(2)}>
						<Text style={style.title}>节点</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.item} onPress={()=>this.onPress(3)}>
						<Text style={style.title}>关于</Text>
					</TouchableOpacity>
				</View>
				<View style={style.info}>
					<Text style={style.info_text}>创意工作者们的社区</Text>
					<Text style={style.info_text}>{apiHost}</Text>
				</View>
				
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLogined: state.user.isLogined,
		user : state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(drawerActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);