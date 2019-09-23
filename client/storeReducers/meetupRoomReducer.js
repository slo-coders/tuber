import { CREATE_MEETUP_ROOM } from '../actions/actionTypes';

const meetupRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MEETUP_ROOM:
      console.log('inside meetupRoomReducer', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default meetupRoomReducer;
