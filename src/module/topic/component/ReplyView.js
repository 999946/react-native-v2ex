import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	View,
	Keyboard,
	TouchableOpacity
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/Ionicons';
import style from '../style/ReplyView';

export default class ReplyView extends Component {
	constructor(props){
		super(props);
		this.state = {
			height : this.props.minHeight,
			showBtn : false
		}
	}
	static defaultProps = {
		onCancel 		: undefined,
		onSubmit	 	: undefined,
		minHeight	 	: 30,
		maxHeight		: 150,
		value 			: undefined,
		onChangeText	: ()=>{}
  	}
	componentWillMount () {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
	}
	componentWillUnmount () {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}
	_keyboardDidShow = () => {
		this.setState({
			showBtn : true
		})
	}
	_keyboardDidHide = () => {
		this.setState({
			showBtn : false
		})
	}
	getInput() {
		return this.input;
	}
	render() {
		return (
			<View>
				<TextInput
					ref={ref=> this.input = ref}
					style={[style.input, {
						maxHeight: this.props.maxHeight,
						minHeight: this.props.minHeight,
						height : this.state.height}]}
					value={this.props.value}
					autoCapitalize='none'
					autoCorrect={false}
					placeholder="请尽量让自己的回复能够对别人有帮助回复"
					clearButtonMode='while-editing'
					clearTextOnFocus={false}
					selectTextOnFocus={false}
					enablesReturnKeyAutomatically={true}
					returnKeyType='default'
					multiline={true}
					underlineColorAndroid='transparent'
					onChange={(e)=>{
						// 动态修改高度
						let newHeight = e.nativeEvent.contentSize.height;
						if (this.state.height !== newHeight){
							if(newHeight <= this.props.maxHeight && newHeight >= this.props.minHeight) {
								this.setState({
									height: newHeight
								});
							}else if(newHeight < this.props.minHeight){
								this.setState({
									height: this.props.minWidth
								});
							}
						}
					}}
					onChangeText={(value)=>{
						this.props.onChangeText(value);
					}}
					/>
				{
				this.state.showBtn && 
					<View style={style.btns}>
						<TouchableOpacity 
							style={style.leftBtn}
							hitSlop={{top: 6, left: 8, bottom: 6, right: 8}}
							onPress={()=>this.props.onCancel && this.props.onCancel()}>
							<View style={style.btn_content}>
								<Icon name='md-close' size={20}/>
								<Text> 取消</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity 
							style={style.rightBtn} 
							hitSlop={{top: 6, left: 8, bottom: 6, right: 8}}
							onPress={()=>this.props.onSubmit && this.props.onSubmit(this.state.value)}>
							<View style={style.btn_content}>
								<Icon name='md-checkmark' size={20}/>
								<Text> 发送</Text>
							</View>
						</TouchableOpacity>
					</View>
				}
				<KeyboardSpacer/>
			</View>
		)
	}
}