import {
	StyleSheet,
	PixelRatio
} from 'react-native';

export default StyleSheet.create({
	header: {
		marginTop: 30,
		flex:1,
		flexDirection:'column',
		justifyContent:'flex-end',
		alignItems:'center',
		paddingBottom: 4,
		borderBottomColor:"aliceblue",
		borderBottomWidth: 1/PixelRatio.get(),
	},
	user:{
		marginBottom: 10
	},
	avatar:{
		width:48,
		height:48,
		borderRadius:6
	},
	username:{
		paddingTop:5,
		fontSize: 16,
		color:'#fff'
	},
	menu : {
		flex:4,
		paddingTop: 10,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	item : {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center'
	},
	item_disabled:{
		opacity: 0.5,
		color:'#ccc'
	},
	item_selected_flag:{
		height:18,
		width: 2,
		backgroundColor:'#fff',
		zIndex: 1
	},
	title : {
		flex:1,
		textAlign:'center',
		fontSize: 18,
		color: '#fff',
	},
	info :{
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		paddingBottom: 10
	}, 
	info_text : {
		fontSize: 10,
		color:'#fff'
	}
});