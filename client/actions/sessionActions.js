import axios from 'axios';
import * as action from './actionTypes';

export const loginThunked = userInfo => async dispatch => {
  try {
    const loginUser = await axios.post('/api/sessions/login', userInfo);
    console.log('waldo1'+loginUser)
    dispatch({ type: action.LOGIN_USER, payload: loginUser.data });
  } catch (err) {
    console.error(err);
  }
};
// Logout User
export const LogoutThunked = userInfo => async dispatch => {
  try {
    const logoutUser = await axios.post('/api/sessions/logout', userInfo);
    dispatch({ type: action.LOGOUT_USER, payload: logoutUser.data });
  } catch (err) {
    console.log(err);
  }
};
//fetch a logged-in user
export const fetchLoggedInThunked = () => async dispatch => {
  try {
    const authUser = await axios.get('/api/sessions/login');
    dispatch({ type: action.FETCH_LOGGED_USER, payload: authUser.data });
  } catch (err) {
    console.log(err);
  }
};
