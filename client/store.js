import { applyMiddleware, combineReducers, createStore } from 'redux';

//import individual reducers here
import { userReducer, allUsersReducer } from './storeReducers/userReducer';
import courseReducer from './storeReducers/courseReducer';
import topicReducer from './storeReducers/topicReducer';
import userTopicReducer from './storeReducers/userTopicReducer';
import meetupReducer from './storeReducers/meetupReducers';
import userMeetupReducer from './storeReducers/userMeetupReducer';
import authReducer from './storeReducers/authReducer';
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
  userTopics: userTopicReducer,
  userMeetup: userMeetupReducer,
  auth: authReducer,
  userSession: userSessionReducer,
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
