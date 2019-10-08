import axios from 'axios';
import * as actions from './actionTypes';


export const postUserThunk = user => async dispatch => {
  try {
    const response = await axios.post('/api/users', user);
    console.log('user from postUserThunk in userActions.js >>> ', response.data); //TODO: remove password
    dispatch({ type: actions.POST_USER, user: response.data });
  } catch (err) {
    console.error(err);
  }
};
