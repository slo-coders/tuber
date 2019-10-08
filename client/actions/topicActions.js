import axios from 'axios';

import {
  FETCH_TOPIC_ALL,
  FETCH_TOPIC,



} from './actionTypes';

export const listTopicsThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/topics');
    dispatch({ type: FETCH_TOPIC_ALL, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const singleTopicThunk = topicId => async dispatch => {
  try {
    const response = await axios.get(`/api/topics/${topicId}`);
    // console.log('SINGLE TOPIC THUNK', response.data);
    dispatch({ type: FETCH_TOPIC, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};


