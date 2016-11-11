import {
	StyleSheet,
	PixelRatio
} from 'react-native';

export default StyleSheet.create({
	row : {
		height: 80,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal:10,
		paddingVertical: 8
	},
	avatar : {
		height : 48,
		width: 48,
		borderRadius: 8
	},
	rightWrap:{
		flex : 1,
		justifyContent:'space-between'
	},
	title : {
		flex : 1,
		fontSize : 14,
		color : '#333333'
	},
	nodeWrap:{
		flex : 1,
		flexDirection:'row',
		alignItems:'flex-end'
	},
	node :{
		backgroundColor:'#e5e5e5',
		fontSize : 12,
		color : '#999999',
		padding: 2,
		marginRight: 4
	},
	user : {
		alignItems:'flex-end',
		justifyContent : 'space-between'
	},
	username : {
		fontSize : 10,
		color : '#999999',
		marginTop: 2
	},
	time : {
		fontSize : 12,
		color : '#999999',
		marginRight: 2
	},
	replies : {
		fontSize : 12,
		color : '#999999'
	},
	separator:{
		backgroundColor:'#e5e5e5',
		height:1/PixelRatio.get()
	}
});