import axios from 'axios';
import * as action from './actionTypes';

export const getMeetupDataThunked = (userId, meetupId) => async dispatch => {
  try {
    const response = await axios.get(
      `/api/users/${userId}/userMeetup/${meetupId}`,
    );
    dispatch({ type: action.GET_MEETUP_DATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateMeetupDataThunked = (
  userId,
  meetupId,
  newInfo,
) => async dispatch => {
  try {
    const response = await axios.put(
      `/api/users/${userId}/userMeetup/${meetupId}`,
      newInfo,
    );
    dispatch({ type: action.UPDATE_MEETUP_DATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
