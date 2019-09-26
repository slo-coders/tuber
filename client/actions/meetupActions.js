import axios from 'axios';

import {
  FETCH_MEETUP,
  DELETE_MEETUP,
  POST_MEETUP,
  EDIT_MEETUP,
  REMOVE_SINGLE_MEETUP,
} from './actionTypes';

//returns a meetupinstance including the users
//may not work if the meetup is closed (i.e. returns ...:[])
export const singleMeetupThunk = meetupId => async dispatch => {
  try {
    // console.log('meetupId in singleMeetupThunk: ', meetupId);
    const response = await axios.get(`/api/meetups/${meetupId}`);
    dispatch({ type: FETCH_MEETUP, payload: response.data });
    // console.log('singleMeetupThunk response.data: ', response.data);
  } catch (err) {
    console.error(err);
  }
};

export const removeSingleMeetupThunk = () => dispatch => {
  try {
    dispatch({ type: REMOVE_SINGLE_MEETUP });
  } catch (err) {
    console.log(err);
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
