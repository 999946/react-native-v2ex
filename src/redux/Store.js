
import { createStore , applyMiddleware , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from 'v2ex/src/redux/Reducers';

const logger = createLogger();

let createStoreWithMiddleware = null;
if(__DEV__){
	createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
}else{
	createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
}

const reducer = combineReducers(reducers);

export default store = createStoreWithMiddleware(reducer);