import React, { Component } from 'react';
import {
	StyleSheet,
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';

import style from 'v2ex/src/module/nodes/style/Nodes';
import nodesData from 'v2ex/src/module/nodes/res/NodesData';
import Navbar from 'v2ex/src/widget/Navbar';

import NodeTopics from 'v2ex/src/module/nodes/component/NodeTopics';

export default class Nodes extends Component {
	openNodeTopics(node){
		this.props.navigator.push({
			component : NodeTopics,
			params : {title : node.title, node : node.name}
		})
	}
	renderTr = (trData) =>{
		return (
			<View key={trData.node_name} style={style.tr}>
				<View style={style.tr_header}>
					<Text style={style.tr_header_title}>{trData.node_name}</Text>
				</View>
				<View style={style.rows}>
					{
						trData.children.map((row, index)=>{
							return this.renderRow(row);
						})
					}
				</View>
			</View>
		)
	}
	renderRow = (rowData) => {
		return (
			<TouchableOpacity 
				key={rowData.title + rowData.name}
				style={style.row} 
				onPress={()=>{this.openNodeTopics(rowData)}}>
				<Text style={style.row_title}>{rowData.title}</Text>
			</TouchableOpacity>
		) 
	}
	render() {
		return (
			<View style={{flex:1,backgroundColor:'red'}}>
				<Navbar 
					title='节点'
					navigator={this.props.navigator}
				/>
				<ScrollView
					style={{flex:1,backgroundColor:'#fff'}} 
					>
					{
						nodesData.map((v, i)=>{
							return this.renderTr(v);
						})
					}
				</ScrollView>
			</View>
		);
	}
}
