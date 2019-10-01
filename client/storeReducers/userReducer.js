import * as actions from '../actions/actionTypes';

const initUser = {};

export const userReducer = (state = initUser, action) => {
  switch (action.type) {
    case actions.FETCH_USER:
    case actions.POST_USER:
    case actions.EDIT_USER:
      return action.user;
    default:
      return state;
  }
};
