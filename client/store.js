import { applyMiddleware, combineReducers, createStore } from 'redux';

//import individual reducers here
import { userReducer, allUsersReducer } from './storeReducers/userReducer';
import courseReducer from './storeReducers/courseReducer';
import topicReducer from './storeReducers/topicReducer';
import meetupReducer from './storeReducers/meetupReducers';
import userMeetupReducer from './storeReducers/userMeetupReducer';
import userSessionReducer from './storeReducers/userSessionReducer';

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  /*add approperate reducers here */
  user: userReducer,
  allUsers: allUsersReducer,
  meetups: meetupReducer,
  // potentialParteners: potentialPartnersReducer,
  courses: courseReducer,
  topics: topicReducer,
  userMeetup: userMeetupReducer,
  userSession: userSessionReducer,
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
