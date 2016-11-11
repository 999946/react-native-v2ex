import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';

import SideMenu from 'react-native-side-menu';
import Popup from 'react-native-popup';
import Menu from './Menu';
import MainView from './MainView';

import * as drawerActions from '../action/Drawer';
import * as userActions from 'v2ex/src/module/user/action/User';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import CustomImage from 'v2ex/src/module/common/CustomImage';
import HtmlView from 'v2ex/src/widget/htmlView/HtmlView';
import ImageGallery from 'v2ex/src/module/common/ImageGallery';

class Index extends Component {
	constructor(props) {
		super(props);
	}
	logout = () => {
		this.popup.confirm({
			content: '是否要退出登录?',
			ok: {
				text: '确认',
				style: {
					color: 'red'
				},
				callback: () => {
					this.props.actions.logout();
				},
			},
			cancel: {
				text: '取消',
				style: {
					color: 'gray'
				}
			}
		});
	}
	componentDidMount() {
		this.props.actions.getToken().then((token)=>{
			if(token != undefined){
				this.props.actions.getUserInfo();
			}
		});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.userToken != this.props.userToken){
			this.props.actions.getUserInfo();
		}
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'azure'}}>
				<SideMenu 
					menu={
						<Menu 
							navigator={this.props.navigator} 
							onLogout={this.logout}
							/>
					}
					openMenuOffset={200}
					onChange={(isOpen)=>{
						if(isOpen){
							this.props.actions.open();
						}else{
							this.props.actions.close();
						}
					}}
					isOpen={this.props.drawerIsOpen}
				>
					<MainView
						navigator={this.props.navigator}
					/>
				</SideMenu>
				<Popup ref={popup => this.popup = popup } isOverlay={true}/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		drawerIsOpen: state.drawer.isOpen,
		userToken : state.user.token
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({...drawerActions, ...userActions}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);