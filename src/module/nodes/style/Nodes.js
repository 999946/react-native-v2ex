import {
	StyleSheet,
	PixelRatio
} from 'react-native';

export default StyleSheet.create({
	tr : {
		flexWrap:'wrap',
		flexDirection:'column'
	},
	tr_header :{
		backgroundColor : '#e2e2e2',
		paddingLeft: 10,
		height: 35,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',	
	},
	tr_header_title : {
		fontSize: 14,
		color: '#000000',
	},
	rows : {
		flexWrap:'wrap',
		flexDirection:'row'
	},
	row : {
		height : 30,
		marginHorizontal: 5,
		padding : 5,
		flexDirection:'row',
		justifyContent : 'center',
		alignItems:'center',
	},
	row_title : {
		fontSize : 12,
		color : '#333333',
		textAlign:'center' 	
	}
});