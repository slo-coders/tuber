import axios from 'axios';
import {
  GET_ALL_USER_TOPICS,
  // GET_USER_TOPIC,
  POST_USER_TOPICS_ARR,
  UPDATE_USER_TOPIC,
  DELETE_USER_TOPIC
} from './actionTypes';

export const getUserTopicsThunked = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${userId}/topics/`);
    dispatch({ type: GET_ALL_USER_TOPICS, userTopicsArr: response.data });
  } catch (err) {
    console.error(err);
  }
};

/* export const getUserTopicThunked = (userId, topicId) => async dispatch => {
  try {
    const response = await axios.get(
      `/api/users/${userId}/topics/${topicId}`,
    );
    dispatch({ type: GET_USER_TOPIC, userTopic: response.data });
  } catch (err) {
    console.error(err);
  }
}; */

export const postUserTopicsArrThunked = (userId, userTopicsArr) => async dispatch => {
  try {
    const response = await axios.post(`/api/users/${userId}/topics`, userTopicsArr);
    dispatch({ type: POST_USER_TOPICS_ARR, userTopicsArr: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const deleteUserTopicThunked = (userId, topicId) => async dispatch => {
  try {
    await axios.delete(
      `/api/users/${userId}/topics/${topicId}`,
    );
    dispatch({ type: DELETE_USER_TOPIC, deletedTopicId: topicId });
  } catch (err) {
    console.error(err);
  }
};

export const updateUserTopicThunked = (
  userId,
  topicId,
  newProficiencyRating,
) => async dispatch => {
  try {
    const response = await axios.put(
      `/api/users/${userId}/topics/${topicId}`,
      newProficiencyRating,
    );
    dispatch({ type: UPDATE_USER_TOPIC, userTopic: response.data });
  } catch (err) {
    console.error(err);
  }
};
