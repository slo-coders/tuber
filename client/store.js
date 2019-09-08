import { applyMiddleware, combineReducers, createStore } from 'redux';

//import individual reducers here
import {userReducer, allUsersReducer} from './storeReducers/userReducer';
import courseReducer from './storeReducers/courseReducer';

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  /*add approperate reducers here */
  user: userReducer,
  allUsers: allUsersReducer,
  // potentialParteners: potentialPartnersReducer,
  courses: courseReducer,
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
