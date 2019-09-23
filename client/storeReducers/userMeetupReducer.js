import {
  UPDATE_MEETUP_DATA,
  GET_USER_MEETUP_DATA,
} from '../actions/actionTypes';

const initialState = {
  // userMeetupsArray: [],
  mostRecentUserMeetup: {}, //mostRecentUserMeetup.id
};

const userMeetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MEETUP_DATA: //Gets one meetup with a userId and meetupId
      return { ...state, mostRecentUserMeetup: action.payload.reqUser };
    // case UPDATE_MEETUP_DATA:
    //   return { ...state, userMeeupsArray: action.payload.meetups };
    default:
      return state;
  }
};

export default userMeetupReducer;
