
import * as types from '../action/ActionTypes';

const initialState = {
	isOpen : false
}

export default function Reduer(state = initialState, action = {}) {
	switch (action.type) {
		case types.DRAWER_OPEN:
			return Object.assign(
				{}, state, { isOpen: action.data }
			)
		case types.DRAWER_CLOSE:
			return Object.assign(
				{}, state, { isOpen: action.data }
			)
		default:
			return state;
	}
}
