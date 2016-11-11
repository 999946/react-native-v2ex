import {
	StyleSheet,
	PixelRatio
} from 'react-native';

export default StyleSheet.create({
	input:{
		backgroundColor:'#f8f8f8',
		borderColor: '#e5e5e5', 
		borderWidth: 1/PixelRatio.get(),
		paddingHorizontal: 10,
		fontSize: 16,
	},
	btns : {
		height: 30,
		backgroundColor:'#fff'
	},
	leftBtn : {
		position: 'absolute',
		left : 10,
		top : 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	rightBtn:{
		position:'absolute',
		right:10,
		top : 6
	},
	btn_content:{
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'center'
	}
});