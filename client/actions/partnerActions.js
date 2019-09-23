import axios from 'axios';
import * as actions from './actionTypes';

export const singlePartnerThunk = partnerId => async dispatch => {
  try {
    console.log('partnerId: ', partnerId);
    const response = await axios.get(`/api/users/${partnerId}`);
    console.log('Single Partner Thunk', response.data);
    dispatch({ type: actions.FETCH_PARTNER, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const updatePartnerUserMeetupThunk = (
  userId,
  meetupId,
  data,
) => async dispatch => {
  try {
    const response = await axios.get(
      `/api/users/${userId}/meetups/${meetupId}`,
      data,
    );
    console.log('UPDATE Partner Thunk', response.data);
    dispatch({
      type: actions.UPDATE_PARTNER_USERMEETUP,
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
};
