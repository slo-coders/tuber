import axios from 'axios';
import {
  GET_ALL_USER_TOPICS,
  POST_USER_TOPICS_ARR,

} from './actionTypes';

export const getUserTopicsThunked = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${userId}/topics/`);
    console.log('getUserTopics', response);
    dispatch({ type: GET_ALL_USER_TOPICS, userTopicsArr: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const postUserTopicsArrThunked = (
  userId,
  userTopicsArr,
) => async dispatch => {
  try {

    const response = await axios.post(
      `/api/users/${userId}/topics`,
      userTopicsArr,
    );

    dispatch({ type: POST_USER_TOPICS_ARR, userTopicsArr: response.data });
  } catch (err) {
    console.error(err);
  }
};

