import React, { Component } from 'react';
import {
	StyleSheet,
	View
} from 'react-native';

import HtmlToElement from './HtmlToElement';

function getTagStyles(baseFontSize=14, lineHeight=5, tabStyles={}){
	const styles = StyleSheet.create(Object.assign({
		div:{
			marginVertical: lineHeight
		},
		div_font:{
			fontSize : baseFontSize
		},
		a : {},
		a_font:{
			color: '#3498DB',
			fontSize : baseFontSize
		},
		p : {
			marginTop: lineHeight
		},
		p_font :{
			fontSize : baseFontSize,
		},
		h1 : {
			marginVertical: lineHeight
		},
		h1_font:{
			fontSize : baseFontSize * 1.6,
			fontWeight: 'bold',
		},
		h2 : {
			marginVertical: lineHeight
		},
		h2_font:{
			fontSize : baseFontSize * 1.5,
			fontWeight: 'bold',
		},
		h3 : {
			marginVertical: lineHeight
		},
		h3_font:{
			fontSize : baseFontSize * 1.4,
			fontWeight: 'bold',
		},
		h4 : {
			marginVertical: lineHeight
		},
		h4_font:{
			fontSize : baseFontSize * 1.3,
			fontWeight: 'bold',
		},
		h5 : {
			marginVertical: lineHeight
		},
		h5_font:{
			fontSize : baseFontSize * 1.2,
			fontWeight: 'bold',
		},
		h6 : {
			marginVertical: lineHeight
		},
		h6_font:{
			fontSize : baseFontSize * 1.1,
			fontWeight: 'bold',
		},
		blockquote:{
			marginVertical:lineHeight,
			paddingLeft: 25,
			paddingHorizontal: 4,
			borderLeftColor:'deepskyblue',
			borderLeftWidth: 3
		},
		blockquote_font:{
			fontSize : baseFontSize,
		},
		address:{
			marginVertical:lineHeight
		},
		address_font:{
			fontSize : baseFontSize,
			fontStyle:'italic',
		},
		em_font:{
			fontStyle:'italic',
			fontSize:baseFontSize
		},
		span_font:{
			fontSize:baseFontSize
		},
		strong_font:{
			fontWeight: 'bold',
			fontSize:baseFontSize
		},
		b_font : {
			fontWeight: 'bold',
			fontSize:baseFontSize
		},
		acronym_font:{
			fontSize:baseFontSize
		},
		del_font:{
			textDecorationLine:'line-through',
			fontSize:baseFontSize
		},
		hr : {
			marginVertical: lineHeight,
			backgroundColor:'#999',
			height: 1
		},
		pre : {
			padding: lineHeight,
			backgroundColor:'#f8f8f8',
		},
		code : {
			
		},
		code_font:{

		}
	}, tabStyles));
	return styles;
}

export default class HtmlView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			elements: null
		}
	}
	componentDidMount() {
		this.htmlToElement(this.props);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps != this.props){
			this.htmlToElement(nextProps);
		}
	}
	htmlToElement(props){
		HtmlToElement(props.html, {
			customRenderer: props.customRenderer,
			tabStyles : getTagStyles(props.baseFontSize, props.lineHeight, props.tabStyles),
			onLinkPress : props.onLinkPress,
			onImagePress : props.onImagePress,
			maxWidth: props.maxWidth
		}, (result) => {
			this.setState({elements: result.items });
		});
	}
	render() {
		return (
			<View style={this.props.style}>
				{this.state.elements}
			</View>
		)
	}
}