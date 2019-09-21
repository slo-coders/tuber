import axios from 'axios';
import * as actions from './actionTypes';

export const getActiveSessionsThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/usersession');
    dispatch({ type: actions.FETCH_ACTIVE_SESSIONS, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const closeUserSession = userId => async dispatch => {
  try {
    await axios.delete(`/api/usersession/${userId}`);
    dispatch({ type: actions.CLOSE_USER_SESSION, userId });
  } catch (err) {
    console.error(err);
  }
};

export const createUserSessionThunk = (userId, userData) => async dispatch => {
  try {
    console.log('in thunk', userId, userData)
    const response = await axios.post(`/api/usersession/${userId}`, userData);
    dispatch({ type: actions.CREATE_USER_SESSION, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};

export const updateUserSessionThunk = (userId, updates) => async dispatch => {
  try {
    const response = await axios.put(`/api/usersession/${userId}`, updates);
    dispatch({ type: actions.CHANGE_USER_SESSION, payload: response.data });
  } catch (err) {
    console.error(err);
  }
};
