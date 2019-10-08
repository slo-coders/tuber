import * as actions from '../actions/actionTypes';

const initialState = {
  activeSessions: {},
  singleUserSessionInfo: {},
};

const userSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_USER_SESSION:
      console.log('inside userSession reducers');
      //may want to return all active sessions after posting a new userSession... Here I am only returning the info for one user for the Front-end to update UI
      return { ...state, singleUserSessionInfo: action.payload };
    default:
      return state;
  }
};

export default userSessionReducer;
