
import * as types from '../action/ActionTypes';

const initialState = {
	detail: {}
}

export default function Reduer(state = initialState, action = {}) {
	switch (action.type) {
		case types.SET_TOPIC_DETAIL: {
			const detail = state.detail;
			detail[action.data.id] = Object.assign({}, detail[action.data.id], { detail: action.data.detail });
			return Object.assign(
				{}, state, { detail }
			)
		}
		case types.DRAWER_CLOSE:
			return Object.assign(
				{}, state, { isOpen: action.data }
			)
		default:
			return state;
	}
}
