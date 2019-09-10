import { GET_MEETUP_DATA, UPDATE_MEETUP_DATA } from '../actions/actionTypes';

const initialState = {
  userMeetup: [],
};

const userMeetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEETUP_DATA:
      return action.payload;
    case UPDATE_MEETUP_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default userMeetupReducer;
