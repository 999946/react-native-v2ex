import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Platform,
	Dimensions,
	TouchableOpacity,
	InteractionManager
} from 'react-native';
import CookieManager from 'react-native-cookies';
const {width, height} = Dimensions.get('window');

import Navbar from 'v2ex/src/widget/Navbar';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../style/MainView';

import * as drawerActions from '../action/Drawer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as V2exAPI from 'v2ex/src/service/V2exAPI';
import Tabs from 'v2ex/src/module/tabs/component/Tabs';
import Nodes from 'v2ex/src/module/nodes/component/Nodes';

class MainView extends Component {
	triggerDrawer = () => {
		if(this.props.drawerIsOpen){
			this.props.actions.close();
		}else{
			this.props.actions.open();
		}
	}
	render() {
		return (
			<View
				style={{flex:1,backgroundColor:'#fff'}} 
				>
				<Navbar 
					title={
						<Choose>
							<When condition={ Platform.OS == 'android' }>
								<View style={{
									height: 35,
									width: width - 80,
									justifyContent:'center',
									alignItems: 'flex-start'
								}}>
									<Text style={{fontWeight:'bold',fontSize:18,color:'#000'}}>V2EX</Text>
								</View>
							</When>
							<Otherwise>
								{undefined}
							</Otherwise>
						</Choose>
					}
					leftButton={
						<TouchableOpacity style={style.leftNavBtn} onPress={()=>this.triggerDrawer()} >
							{this.props.drawerIsOpen ? <Icon name="md-close" size={22}/> : <Icon name="ios-menu" size={22}/>}
						</TouchableOpacity>
					}
					navigator={this.props.navigator}
				/>
				<Tabs navigator={this.props.navigator}/>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		drawerIsOpen: state.drawer.isOpen
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(drawerActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);