import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Modal,
	TouchableOpacity,
	Dimensions,
	Image,
	CameraRoll
} from 'react-native';

import ImageZoom from 'react-native-image-pan-zoom';
import Toast from 'react-native-root-toast';

const { width, height } = Dimensions.get('window')
export default class ImageGallery extends Component {
	constructor(props) {
		super(props);
	}
	saveToCameraRoll = () => {
		CameraRoll.saveToCameraRoll(this.props.image.url)
		.then(()=>{
			Toast.show('保存成功');
		}).catch(()=>{
			Toast.show('保存失败');
		});
	}
	render() {
		let finalSize;
		if(this.props.image){
			finalSize = { width: this.props.image.width, height: this.props.image.height };
			if (this.props.image && this.props.image.width > width) {
				finalSize.width = width;
				const ratio = width / this.props.image.width;
				finalSize.height = this.props.image.height * ratio;
			}
		}
		return (
			<Modal
				transparent={true}
				animationType='fade'
				visible={this.props.visible}
				>
					{
					this.props.image && 
					<View style={style.container} >
						<ImageZoom 
							cropWidth={width}
							cropHeight={height}
							imageWidth={finalSize.width}
							imageHeight={finalSize.height}
							onClick={this.props.cancel} >
							<Image
								style={{width:finalSize.width, height:finalSize.height}}
								source={{uri: this.props.image.url}}
								/>
						</ImageZoom>
						<View style={style.btns}>
							<TouchableOpacity style={style.leftBtn} onPress={this.props.cancel}>
									<Text style={style.btn_title}>取消</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.rightBtn} onPress={this.saveToCameraRoll}>
									<Text style={style.btn_title}>保存</Text>
							</TouchableOpacity>
						</View>
					</View>
					}
			</Modal>
			
		)
	}
}

const style = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'rgba(0, 0, 0, .3)'
	},
	btns:{
		position: 'absolute',
		bottom: 0,
		width : width,
		height : 50,
		flexDirection: 'row',
		padding: 20
	},
	leftBtn : {
		position:'absolute',
		top : 10,
		left : 20,
		backgroundColor: 'rgba(0, 0, 0, .6)',
		padding : 8
	},
	rightBtn : {
		position:'absolute',
		top : 10,
		right : 20,
		backgroundColor: 'rgba(0, 0, 0, .6)',
		padding : 8
	},
	btn_title :{
		fontSize : 14,
		color : '#fff'	
	}
})