import * as types from './ActionTypes';
import { createAction } from 'v2ex/src/lib/ReduxUtil';
import * as V2exAPI from 'v2ex/src/service/V2exAPI';
import CookieManager from 'react-native-cookies';
import { apiDomain } from 'v2ex/src/config';

export function login(loginId, password){
	return async (dispatch)=>{
		const result = await V2exAPI.login(loginId, password);
		dispatch(createAction(types.USER_LOGIN)(result));
		return result;
	}
}

export function logout(){
	return (dispatch)=>{
		return new Promise((resolve, reject) => {
			CookieManager.clearAll((err, res) => {
				if(err)reject(err);
				dispatch(createAction(types.USER_LOGOUT)());
				resolve(res);
			});
		});
	}
}

export function getToken(){
	return (dispatch)=>{
		return new Promise((resolve, reject) => {
			CookieManager.get(apiDomain, (err, res) => {
				if(err)reject(err);
				dispatch(createAction(types.SET_USER_TOKEN)(res['A2']));
				resolve(res['A2']);
			});
		});
	}
}

export function getUserInfo(){
	return async (dispatch)=>{
		const result = await V2exAPI.getCurrUser();
		dispatch(createAction(types.SET_USER_INFO)(result));
		return result;
	}
}