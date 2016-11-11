import React from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import htmlparser from 'htmlparser2-without-node-native';
import ResizeImage from './ResizeImage';

const breakTagArr = [
	'div','p','img', 'br','hr',
 	'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
	'blockquote','address','dir','dl', 'dt','dd', 'ul', 'ol', 'li','form', 'pre'];

function getTagStyles(opts, tag){
	if(tag){
		const fontStyles = opts.tabStyles[`${tag}_font`] ? opts.tabStyles[`${tag}_font`] : {};
		const wrapperStyles = opts.tabStyles[`${tag}`] ? opts.tabStyles[`${tag}`] : {};
		return { wrapperStyles, fontStyles };
	}
	return {};
}

function domToElement(doms, opts) {
	if (!doms) return null;

	const items = [];
	let isViewWraper = false;
	doms.forEach((node, index, list) => {
		if (opts.customRenderer) {
			let rendered = opts.customRenderer(node, index, list);
			if (rendered){
				if(rendered.type.displayName !== 'Text'){
					isViewWraper = true;
				}
				items.push(rendered);
				return rendered;
			}
		}

		const { wrapperStyles, fontStyles } = getTagStyles(opts, node.name);
		let children = {};
		if (node.type == 'tag') {
			// 如果有子节点先递归
			if (node.children && node.children.length > 0) {
				children = domToElement(node.children, opts);
			}
			// 将子节点包裹分类, 如果节点中有图片的话会进入到里边
			if(children && children.isViewWraper){
				const childrenItems = children.items;
				const subItems = [];
				let texts = [];
					
				React.Children.forEach(childrenItems, (ele, idx)=>{
					if(ele.type.displayName === 'Text'){
						texts.push(ele);
					}
					if(ele.type.displayName !== 'Text'){
						if(texts.length > 0){
							subItems.push(
								<Text>
								{texts}
								</Text>
							);
							texts = new Array();
						}
						subItems.push(ele);
					}
				})
				if(texts.length > 0){
					subItems.push(
						<Text>
						{texts}
						</Text>
					);
				}
				isViewWraper = true;
				items.push (
					<View 
						key={index}
						style={wrapperStyles}>
						{subItems}
					</View>
				)
			}else if (node.name == 'a') {
				items.push(
					<Text 
						key={index}
						style={wrapperStyles}
						onPress={()=>{
							opts.onLinkPress && opts.onLinkPress(node)
						}}>
						{children.items}
					</Text>
				)
			}else if (node.name == 'img') {
				isViewWraper = true;
				const img_w = +node.attribs['width'] || +node.attribs['data-width'] || 0
				const img_h = +node.attribs['height'] || +node.attribs['data-height'] || 0
				items.push(
					<ResizeImage 
						key={node.name+'_'+index}
						source={{uri: node.attribs.src}}
						style={{width: img_w, height: img_h}}
						maxWidth={opts.maxWidth}
						onPress={(source, width, height)=>{
							opts.onImagePress && opts.onImagePress(node, width, height)
						}}
						/>
				)
			} else if (node.name == 'hr') {
				isViewWraper = true;
				items.push (
					<View 
						key={node.name+'_'+index}
						style={wrapperStyles}
						/>
				)
			} else if (node.name == 'br'){
				if(node.prev && node.prev.name == 'img' && node.parent && (node.parent.name == 'div' || node.parent.name == 'p')){
					// ignore <p><img/><br/><p>
				}else if(index == list.length - 1){
					// ignore <div>text<br/><div>
				}else{
					items.push (
						<Text key={`br_${index}`} >
							{'\n'}
						</Text>
					)
				}
			}else if(breakTagArr.indexOf(node.name) != -1){
				isViewWraper = true;
				items.push (
					<View key={index} style={wrapperStyles}>
						<Text key={index} style={fontStyles}>
							{children.items}
						</Text>
					</View>
				)
			}else{
				items.push (
					<Text key={index} style={fontStyles}>
						{children.items}
					</Text>
				)
			}
		}
		if (node.type == 'text') {
			let tagStyles = {}; let wrapperStyles = null;
			if(node.parent){
				tagStyles = getTagStyles(opts, node.parent.name);
				if(node.parent.children && node.parent.children.length == 1){
					wrapperStyles = tagStyles.wrapperStyles;
				}
			}
			items.push (
				<Text key={index} style={[tagStyles.fontStyles, wrapperStyles]}>
					{node.parent && node.parent.name == 'li' && index == 0 ? '  \u2022  ' : null}
					{node.data !='\n' ? node.data : ''}
				</Text>
			)
		}
	});
	return {
		isViewWraper : isViewWraper,
		items : items
	};
}


function htmlToElement(html, opts, done) {
	const handler = new htmlparser.DomHandler(function (err, dom) {
		if (err) done(err);
		done(domToElement(dom, opts));
	});

	const parser = new htmlparser.Parser(handler);
	parser.write(html);
	parser.done();
}


export default htmlToElement;