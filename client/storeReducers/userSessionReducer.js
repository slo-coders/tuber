import * as actions from '../actions/actionTypes';

const initialState = {
  activeSessions: {},
  singleUserInfo: {},
};

const userSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_ACTIVE_SESSIONS:
      //returns an object of that has arrays of UserSessions filterd by UserType ('mentor', 'mentee', 'peer')
      return { ...state, activeSessions: action.payload };
    case actions.CREATE_USER_SESSION:
      //may want to return all active sessions after posting a new userSession... Here I am only returning the info for one user for the Front-end to update UI
      return { ...state, singleUserInfo: action.payload };
    case actions.CHANGE_USER_SESSION:
      //Same consideration as above. We may need to rethink this based on how what the user experince will be...
      return { ...state, singleUserInfo: action.payload };
    case actions.CLOSE_USER_SESSION:
      //Close userSession but does not log user out of the app
      return {};
    default:
      return state;
  }
};

export default userSessionReducer;
