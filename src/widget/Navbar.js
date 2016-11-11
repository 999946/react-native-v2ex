import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	Dimensions,
	View,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationBar from 'react-native-navbar';
const {width} = Dimensions.get('window');

export default class Navbar extends Component {
	constructor(props){
		super(props);
	}
	render() {
		const { title, ...props} = this.props;
		return (
			<NavigationBar 
				tintColor='#fff'
				leftButton={
					<TouchableOpacity 
						style={style.leftNavBtn} 
						hitSlop={{top: 0, left: 30, bottom: 0, right: 80}}
						onPress={()=>this.props.navigator.pop()} >
						<Icon name="ios-arrow-back-outline" size={22}/>
					</TouchableOpacity>
				}
				style={{
					flex: 1,
					backgroundColor: '#fff',
					borderBottomColor:'#e5e5e5',
					borderBottomWidth:1
				}}
				statusBar={{
					style: 'default',
					hideAnimation: 'fade',
					showAnimation: 'slide',
					tintColor:'#fff'
				}}
				title={
					typeof title === 'string' ? <View style={{
						height: 35,
						width: width - 100,
						flexWrap: 'nowrap',
						justifyContent:'center',
						alignItems: 'center'
					}}>
					<Text style={{
						color : '#000'
					}} numberOfLines={1}>{title}</Text>
					</View>
					: this.props.title
				}
				{...props}
			/>
		)
	}
}

const style = StyleSheet.create({
  	leftNavBtn:{
		padding: 6,
		justifyContent: 'center'
	}
})


