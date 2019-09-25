import axios from 'axios';
import * as action from './actionTypes';

//gets all meetups for a user
export const getUserMeetupDataThunked = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${userId}/meetups/`);
    dispatch({ type: action.GET_USER_MEETUP_DATA, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};
//returns User w/ User.meetups[].user_meetup.meetupId||status

// gets a single meetup for a specific user
export const getMeetupDataThunked = (userId, meetupId) => async dispatch => {
  try {
    const response = await axios.get(
      `/api/users/${userId}/meetups/${meetupId}`,
    );
    dispatch({ type: action.GET_MEETUP_DATA, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateMeetupDataThunked = (
  userId,
  meetupId,
  newInfo,
) => async dispatch => {
  try {
    const response = await axios.put(
      `/api/users/${userId}/meetups/${meetupId}`,
      newInfo,
    );
    dispatch({ type: action.UPDATE_MEETUP_DATA, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
