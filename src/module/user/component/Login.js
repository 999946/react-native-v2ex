import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight
} from 'react-native';
import Navbar from 'v2ex/src/widget/Navbar';
import style from 'v2ex/src/module/user/style/Login';
import Loading from 'v2ex/src/widget/Loading';

import * as V2exAPI from 'v2ex/src/service/V2exAPI';

import * as userActions from '../action/User';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			loginId : undefined,
			password : undefined
		}
	}
	componentDidMount(){
		
	}
	onLogin = () => {
		const {loginId, password} = this.state;
		Loading.show();
		this.props.actions.login(loginId, password)
		.then((data)=>{
			if(data.username && data.avatar){
				this.props.navigator.pop();
			}
		})
		.finally(()=>Loading.hide());
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<Navbar 
					title='登录'
					navigator={this.props.navigator}
					/>
				<View style={style.form}>
					<Text style={style.logo}>V2EX</Text>
					{/* 解决TextInput无法设置上下边框的问题 issues/29 */}
					<View style={style.loginId_boder}>
						<TextInput 
							value={this.state.loginId}
							style={style.loginId}
							placeholder='用户名或者电子邮箱'
							clearButtonMode='unless-editing'
							returnKeyType='next'
							autoCorrect={false}
							autoCapitalize='none'
							underlineColorAndroid='transparent'
							onChangeText={(loginId)=>this.setState({loginId})}
							/>
					</View>
					<View style={style.password_boder}>
						<TextInput 
							value={this.state.password}
							style={style.password} 
							placeholder='密码'
							clearButtonMode='unless-editing'
							secureTextEntry={true}
							onSubmitEditing={this.onLogin}
							returnKeyType='go'
							autoCorrect={false}
							autoCapitalize='none'
							underlineColorAndroid='transparent'
							onChangeText={(password)=>this.setState({password})}
							/>
					</View>
					<TouchableHighlight 
						style={style.submit}
						underlayColor='#e5e5e5'
						onPress={this.onLogin}>
						<Text style={style.submit_label}>登录</Text>
					</TouchableHighlight>
				</View>

			</View>
		)
	}
}

function mapStateToProps(state) {
	return {
		drawerIsOpen: state.user.isLogined
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);