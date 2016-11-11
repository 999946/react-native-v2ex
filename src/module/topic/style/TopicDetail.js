import {
	StyleSheet,
	PixelRatio
} from 'react-native';

export default StyleSheet.create({
	rightNavBtn : {
		padding: 6,
		justifyContent: 'center'
	},
	titleBar:{
		height: 0,
		opacity: 0,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal:10,
		paddingVertical: 0,
		flexWrap: 'nowrap'
	},
	title_avatar : {
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
	title_username : {
		fontSize : 10,
		color : '#999999',
		marginTop: 2
	},
	title_time : {
		fontSize : 12,
		color : '#999999',
		marginRight: 2
	},
	list : {
		backgroundColor:'#fff',
		borderTopColor:'#e5e5e5',
		borderTopWidth: 1/PixelRatio.get()
	},
	replies_herader:{
		height:35,
		backgroundColor:'#e5e5e5',
		paddingHorizontal:10,
		paddingVertical: 5,
		justifyContent:'center'
	},
	row : {
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingVertical: 6
	},
	avatar : {
		width: 24,
		height: 24,
		borderRadius: 12
	},
	right_wrap:{
		flex:1,
		paddingLeft: 5
	},
	row_header:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'nowrap',
		alignItems: 'center',
		marginBottom: 2
	},
	username : {
		fontSize:12,
		color: '#999'
	},
	time :{
		marginLeft: 10,
		fontSize:12,
		color: '#999',
		flex:1
	},
	replies :{
		fontSize:12,
		color: '#999'
	},
	thanks:{
		marginLeft: 4,
		fontSize:12,
		color: '#999'
	},
	separator:{
		backgroundColor:'#e5e5e5',
		height:1/PixelRatio.get()
	},
	
	
	
});