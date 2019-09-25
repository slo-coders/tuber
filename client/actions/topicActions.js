import axios from 'axios';

import {
  FETCH_TOPIC_ALL,
  FETCH_TOPIC,
  POST_TOPIC,
  DELETE_TOPIC,
  EDIT_TOPIC,
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
    console.log('SINGLE TOPIC THUNK', response.data);
    dispatch({ type: FETCH_TOPIC, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const postTopicThunk = topic => async dispatch => {
  try {
    const response = await axios.post('/api/topics', topic);
    dispatch({ type: POST_TOPIC, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const editTopicThunk = (topicId, info) => async dispatch => {
  try {
    const response = await axios.put(`/api/topics/${topicId}`, info);
    dispatch({ type: EDIT_TOPIC, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const deleteTopicThunk = topic => async dispatch => {
  try {
    await axios.delete(`/api/topics/${topic.id}`);
    dispatch({ type: DELETE_TOPIC, payload: topic });
  } catch (e) {
    console.error(e);
  }
};
