import * as action from './actionTypes';

export const createMeetupRoomThunk = info => dispatch => {
  // console.log('in createMeetupRoomThunk', info);
  dispatch({ type: action.CREATE_MEETUP_ROOM, payload: info });
  //object with pairedUsersMeetups information.(keys are `reqUser` and `partner`)
};

//removed paired user meetup information from store after closing chatroom
export const removePairedUserMeetupsThunk = () => dispatch => {
  try {
    console.log('removeParedUser meetup thunk in meetupRoom actions');
    dispatch({ type: action.REMOVE_PAIRED_USER_MEETUPS });
  } catch (err) {
    console.log(err);
  }
};
