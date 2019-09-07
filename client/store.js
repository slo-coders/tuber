import { applyMiddleware, combineReducers, createStore } from 'redux';

//import individual reducers from store reducers folder here

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  /*add approperate reducers here */
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
