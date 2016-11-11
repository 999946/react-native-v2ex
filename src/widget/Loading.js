import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	View,
	TouchableOpacity,
	Text,
	Modal,
	Platform
} from 'react-native';

var Spinner = require('react-native-spinkit');

import RootSiblings from 'react-native-root-siblings';

class LoadingComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			visible: this.props.visible,
			scale: new Animated.Value(1),
		}
	}
	static defaultProps = {
		visible: false,
		title: '载入中...',
		onLongPress: () => { }
	}
	static propTypes = {
		visible: React.PropTypes.bool,
		title: React.PropTypes.string, // 标题
		onLongPress: React.PropTypes.func
	}
	componentDidMount() {
		if (this.props.visible) {
			this.show()
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.visible != nextProps.visible) {
			if (nextProps.visible) {
				this.show();
			} else {
				this.hide();
			}
		}
	}
	show() {
		this.state.scale.setValue(0);
		Animated.spring(this.state.scale, {
			toValue: 1
		}).start();
		this.setState({
			visible: true
		});
	}
	hide() {
		Animated.timing(this.state.scale, {
			toValue: 0
		}).start(() => {
			this.setState({
				visible: false
			});
		});
	}
	render() {
		return (
			<Modal
				transparent={true}
				visible={this.state.visible}>
				<TouchableOpacity
					activeOpacity={1}
					style={{flex:1,backgroundColor:'transparent',justifyContent:'center', alignItems:'center'}}
					onLongPress={this.props.onLongPress}
					>
					<Animated.View style={[{ width: 100, height: 100 },{transform: [{ scale: this.state.scale }]}]}>
							<View style={{ paddingTop: 15, width: 100,height: 100, backgroundColor: 'rgba(23,23,23,0.8)', borderRadius: 8 }}>
								<Spinner size={40} isVisible={true} type={'Circle'} color={'#0099cc'} style={{marginLeft: Platform.OS == 'ios' ? 25 : 30}}/>
								<Text style={{ width: 100, marginTop: 20, color: '#fff', textAlign: 'center'}}>{this.props.title}</Text>
							</View>
					</Animated.View>
				</TouchableOpacity>
			</Modal>
		)
	}
}

export default class {
	static displayName = 'Loading';
	_loading = null;
	static show = (props) => {
		this._loading = new RootSiblings(<LoadingComponent {...props} visible={true}/>);
		return this._loading;
	};
	static hide = (props) => {
		this._loading.update(<LoadingComponent {...this.props} visible={false} />);
	};
}
