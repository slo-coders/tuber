import { applyMiddleware, combineReducers, createStore } from 'redux';

//import individual reducers here
import courseReducer from './storeReducers/courseReducer';
import topicReducer from './storeReducers/topicReducer';

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  /*add approperate reducers here */
  courses: courseReducer,
  topics: topicReducer
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
