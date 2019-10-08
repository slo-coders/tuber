import axios from 'axios';
import * as actions from './actionTypes';

export const closeUserSession = userId => async dispatch => {
  try {
    await axios.delete(`/api/usersession/${userId}`);

    dispatch({ type: actions.CLOSE_USER_SESSION, userId });
  } catch (err) {
    console.error(err);
  }
};

export const createUserSessionThunk = userData => async dispatch => {
  try {
    const response = await axios.post('/api/usersessions', userData);

    if (response.data.partner) {
      // backend returns "paired UserMeetups" if meetup can be created
      // console.log('INSIDE createUserSessionThunk_PAIRED', response.data.partner,);
      dispatch({
        type: actions.GET_USER_MEETUP_DATA,
        payload: response.data.reqUser,
      });
      dispatch({
        type: actions.CREATE_MEETUP_ROOM,
        payload: response.data,
      });
    } else {
      // console.log('INSIDE createUserSessionThunk_USERSESSION', response.data);
      dispatch({
        type: actions.CREATE_USER_SESSION,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
  }
};
