import axios from 'axios';
import * as actions from './actionTypes';

export const singlePartnerThunk = partnerId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${partnerId}`);
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
    // console.log('sending axios req with data: ', data);
    const response = await axios.put(
      `/api/users/${userId}/meetups/${meetupId}`,
      data,
    );
    dispatch({
      type: actions.UPDATE_PARTNER_USERMEETUP,
      payload: response.data,
    });
    //also update the user's userMeetup
    dispatch({
      type: actions.GET_USER_MEETUP_DATA,
      payload: response.data,
    });
  } catch (err) {
    console.error(err);
  }
};
