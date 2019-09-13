import {
  FETCH_LOGGED_USER,
  LOGOUT_USER,
  LOGIN_USER,
} from '../actions/actionTypes';

const initialState = {
  authUser: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGGED_USER:
      return { ...state, authUser: action.payload };

    case LOGOUT_USER:
      return { ...state, authUser: action.payload };

    case LOGIN_USER:
      return {
        ...state,
        authUser: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
