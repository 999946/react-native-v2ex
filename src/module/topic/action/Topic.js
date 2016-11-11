import * as types from './ActionTypes';
import { createAction } from 'v2ex/src/lib/ReduxUtil';
import * as V2exAPI from 'v2ex/src/service/V2exAPI';

export function getTopicDetail(id){
	return async (dispatch)=>{
		const result = await V2exAPI.topic({id: id});
		dispatch(createAction(types.SET_TOPIC_DETAIL)({id: id, detail: result}));
		return result;
	}
}

export function reply(id, content){
	return async (dispatch)=>{
		const result = await V2exAPI.reply(id, content);
		return result;
	}
}