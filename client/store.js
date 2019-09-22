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
import socketReducer from './storeReducers/socketReducer';

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  meetups: meetupReducer,
  // potentialParteners: potentialPartnersReducer,
  courses: courseReducer, //courses.singleCourseWithTopics
  topics: topicReducer,
  userTopics: userTopicReducer,
  userMeetup: userMeetupReducer,
  auth: authReducer,
  userSession: userSessionReducer,
  socket: socketReducer,
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
