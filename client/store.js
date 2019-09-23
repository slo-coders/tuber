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
// import socketReducer from './storeReducers/socketReducer';
import meetupRoomReducer from './storeReducers/meetupRoomReducer';
import partnerReducer from './storeReducers/partnerReducer';

const thunkMiddleware = require('redux-thunk').default;

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer,
  meetups: meetupReducer,
  courses: courseReducer, //courses.singleCourseWithTopics
  topics: topicReducer,
  userTopics: userTopicReducer,
  userMeetup: userMeetupReducer, //reqUser: === {mostRecentUserMeetup: {meetupId:, userId:, location:, proficiencyRating:, ...}}
  // to call it use: userMeetup.mostRecentUserMeetup.____
  auth: authReducer,
  //will return either the usersession info OR the usermeetup info with partner information
  userSession: userSessionReducer, //{singleUserSessionInfo:{}, ...}
  // socket: socketReducer,
  partner: partnerReducer,
  pairedUserMeetups: meetupRoomReducer,
  /* {
    "reqUser": {
        "userMeetupId": "86823627-f7ea-48e7-a54b-dff30f6834a5",
        "status": "pending confirmation",
        "userId": "099deee1-850f-4b86-91e3-ad93315f3a69",
        "userType": "mentee",
        "meetupId": "788f2a6d-5d2e-48fe-acc1-95d67edb3b9d",
        "updatedAt": "2019-09-22T23:35:24.057Z",
        "createdAt": "2019-09-22T23:35:24.057Z",
        "proficiencyRating": null,
        "userConfirmation": null
    },
    "partner": {
        "userMeetupId": "340e46d6-4285-4084-97ee-ea01953e225e",
        "status": "pending confirmation",
        "userId": "7bdba6fc-dd24-42cc-ab0a-8d455c1f96f1",
        "userType": "mentor",
        "meetupId": "788f2a6d-5d2e-48fe-acc1-95d67edb3b9d",
        "updatedAt": "2019-09-22T23:35:24.088Z",
        "createdAt": "2019-09-22T23:35:24.088Z",
        "proficiencyRating": null,
        "userConfirmation": null
    }
} */
});

export default createStore(reducer, applyMiddleware(thunkMiddleware));
