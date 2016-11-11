
import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

const { width } = Dimensions.get('window')

const baseStyle = {
	backgroundColor: 'transparent',
	resizeMode : 'contain'
}

export default class ResizableImage extends Component {
	constructor(props){
		super(props);
		let width = 0;
		let height = 0;
		if(this.props.style){
			width = this.props.style.width;
			height = this.props.style.height;
		}
		this.state = {
			width: width || this.props.maxWidth,
			height: height || 30,
			load : false,
			source : width != 0 && height != 0 ? this.props.source : null
		}
	}
	static defaultProps = {
		maxWidth: width,
		style : {width : 0, height : 0},
		source : null
  	}
	componentDidMount() {
		// 当图片未指定宽高时，获取宽度
		if (!this.props.style || (this.props.style && !this.props.style.width && !this.props.style.height)) {
			if(this.props.source){
				const source = this.props.source;
				const { uri, ...other } = source;
				const _source = uri.startsWith('//') ? { uri: 'http:' + uri, ...other} : source;
				Image.getSize(_source.uri, (w, h) => {
					this.setState({
						source : _source,
						width:w, 
						height:h
					});
				})
			}
		}
	}
	onLoadEnd=(success)=>{
		this.setState({
			load : true
		})
	}
	onLongPress = () => {
		// TODO reload image
	}
	render() {
		let finalSize = { width: this.state.width, height: this.state.height };
		if (this.state.width > this.props.maxWidth) {
			finalSize.width = this.props.maxWidth;
			const ratio = this.props.maxWidth / this.state.width;
			finalSize.height = this.state.height * ratio;
		}
		const style = Object.assign(baseStyle, this.props.style, finalSize);
		const source = Object.assign({}, this.state.source, finalSize);
		return (
			<TouchableWithoutFeedback
				style={{backgroundColor:'red'}}
				onLongPress={this.onLongPress}
				onPress={()=>this.props.onPress(this.state.source, this.state.width, this.state.height)}
				 >
				 <View style={finalSize}>
					{this.state.source && <Image
						style={style}
						source={source}
						onLoadEnd={this.onLoadEnd}
						/>}
					{!this.state.load && <ActivityIndicator
						size='large'
						color='rgba(0, 0, 0, 0.5)'
						style={{position: 'absolute', top : 8, left: this.props.maxWidth/2 }}
					/>}
				 </View>
			</TouchableWithoutFeedback>
		)
	}
}

module.exports = ResizableImage;