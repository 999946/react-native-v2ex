import * as types from '../action/ActionTypes';

const initialState = {
	isLogined  : false,
	token : undefined,
	username : undefined,
	avatar : undefined
}

export default function (state = initialState, action = {}) {
	switch (action.type) {
		case types.USER_LOGIN:{
			const {username, avatar} = action.data;
			if(username && avatar) {
				action.data.isLogined = true;
			}
			return Object.assign(
				{}, state, {...action.data}
			)
		}
		case types.USER_LOGOUT:
			return Object.assign(
				{}, state, initialState
			)
		case types.SET_USER_INFO:{
			const {username, avatar} = action.data;
			if(username && avatar){
				action.data.isLogined = true;
			}
			return Object.assign(
				{}, state, {...action.data}
			)
		}
		case types.SET_USER_TOKEN:
			return Object.assign(
				{}, state, {token : action.data}
			)
		default:
			return state;
	}
}