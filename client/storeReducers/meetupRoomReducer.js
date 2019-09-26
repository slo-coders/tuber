import {
  CREATE_MEETUP_ROOM,
  REMOVE_PAIRED_USER_MEETUPS,
} from '../actions/actionTypes';

const meetupRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_MEETUP_ROOM:
      console.log('inside meetupRoomReducer', action.payload);
      return action.payload;
    case REMOVE_PAIRED_USER_MEETUPS:
      console.log('REMOVE_PARED_USER_MEETUP reducer');
      return {};
    default:
      return state;
  }
};

export default meetupRoomReducer;
