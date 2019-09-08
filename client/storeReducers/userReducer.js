import * as actions from '../actions/actionTypes';

const initUser = {};
const initAllUsers = [];
// const initPotentialPartners = [];

export const userReducer = (state = initUser, action) => {
  switch (action.type) {
    case actions.FETCH_USER:
    case actions.POST_USER:
    case actions.EDIT_USER:
      return action.user;
    case actions.DELETE_USER:
      return {};
    default:
      return state;
  }
};

export const allUsersReducer = (state = initAllUsers, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_USERS:
      return action.users;
    default:
      return state;
  }
};

/* export const potentialPartnersReducer = (state = initPotentialPartners, action) => {
  switch (action.type) {
    case actions.FETCH_ALL_USERS:
      return { ...state, allPartnerOptions: action.payload };
    default:
      return state;
  } 
};*/
