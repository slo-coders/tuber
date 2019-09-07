import { applyMiddleware, combineReducers, createStore } from 'redux';

//import individual reducers here
import courseReducer from './storeReducers/courseReducer';

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  /*add approperate reducers here */
  courses: courseReducer,
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
