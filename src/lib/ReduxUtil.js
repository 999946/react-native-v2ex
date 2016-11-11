
export function createAction(actionType){
	return (data, other) => {
		return {type: actionType, data, ...other}
	}
}