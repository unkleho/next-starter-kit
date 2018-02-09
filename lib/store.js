import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';

const exampleInitialState = {};

export const initStore = (initialState = exampleInitialState) => {
	return createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(thunkMiddleware)),
	);
};
