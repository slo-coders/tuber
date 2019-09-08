import axios from 'axios';

import {
  FETCH_MEETUP,
  DELETE_MEETUP,
  POST_MEETUP,
  EDIT_MEETUP,
} from './actionTypes';

export const singleMeetupThunk = meetupID => async dispatch => {
  try {
    const response = await axios.get(`/api/meetups/${meetupID}`);
    dispatch({ type: FETCH_MEETUP, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const postMeetupThunk = meetup => async dispatch => {
  try {
    const response = await axios.post('/api/meetups', meetup);
    dispatch({ type: POST_MEETUP, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const editMeetupThunk = (meetupId, info) => async dispatch => {
  try {
    const response = await axios.put(`/api/meetups/${meetupId}`, info);
    dispatch({ type: EDIT_MEETUP, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteMeetupThunk = meetupId => async dispatch => {
  try {
    await axios.delete(`/api/meetups/${meetupId}`);
    dispatch({ type: DELETE_MEETUP, payload: meetupId });
  } catch (err) {
    console.error(err);
  }
};
