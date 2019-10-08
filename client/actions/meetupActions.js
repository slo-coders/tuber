import axios from 'axios';

import {
  GET_MEETUP_TOPIC,
  FETCH_MEETUP,

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

//meetup action that returns the topic of the meetup instance
export const getMeetupSelectedTopic = meetupId => async dispatch => {
  try {
    const response = await axios.get(`/api/meetups/${meetupId}/topics`);
    dispatch({ type: GET_MEETUP_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};







