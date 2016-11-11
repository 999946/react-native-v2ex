import {
	StyleSheet,
	PixelRatio
} from 'react-native';

export default StyleSheet.create({
	form:{
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	logo:{
		color:'#000',
		fontSize:36,
		textAlign: 'center',
		fontWeight:'800',
		marginVertical: 15
	},
	loginId_boder:{
		borderTopColor:'#e5e5e5',
		borderBottomColor:'#e5e5e5',
		borderTopWidth:1/PixelRatio.get(),
		borderBottomWidth:1/PixelRatio.get(),
		paddingHorizontal: 15
	},
	loginId:{
		fontSize : 14,
		height: 35
	},
	password_boder:{
		borderBottomColor:'#e5e5e5',
		borderBottomWidth:1/PixelRatio.get(),
		paddingHorizontal:15
	},
	password:{
		fontSize : 14,
		height: 35
	},
	submit:{
		marginTop: 15,
		height:35,
		justifyContent:'center',
		backgroundColor:'#e2e2e2',
		alignItems:'center'
	},
	submit_label:{
		fontSize:14,
		color:'#999'
	}
});