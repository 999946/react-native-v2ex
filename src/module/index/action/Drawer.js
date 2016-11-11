import * as types from './ActionTypes';

export function open(){
	return {
		type : types.DRAWER_OPEN,
		data : true
	}
}

export function close(){
	return {
		type : types.DRAWER_OPEN,
		data : false
	}
}