import axios from 'axios';
import * as actions from './actionTypes';

export const listUsersThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/users');
    dispatch({ type: actions.FETCH_ALL_USERS, users: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const singleUserThunk = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    dispatch({ type: actions.FETCH_USER, user: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const postUserThunk = user => async dispatch => {
  try {
    const response = await axios.post('/api/users', user);
    dispatch({ type: actions.POST_USER, user: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const editUserThunk = (userId, updates) => async dispatch => {
  try {
    const response = await axios.put(`/api/users/${userId}`, updates);
    dispatch({ type: actions.EDIT_USER, user: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const deleteUserThunk = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`);
    dispatch({ type: actions.DELETE_USER, userId });
  } catch (e) {
    console.error(e);
  }
};

