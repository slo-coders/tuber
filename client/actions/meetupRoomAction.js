import * as action from './actionTypes';

export const createMeetupRoomThunk = info => dispatch => {
  console.log('in createMeetupRoomThunk', info);
  dispatch({ type: action.CREATE_MEETUP_ROOM, payload: info });
  //object with paired users meetup information.(keys are `reqUser` and `partner`)
};
