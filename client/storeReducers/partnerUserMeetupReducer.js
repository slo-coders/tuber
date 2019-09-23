import * as actions from '../actions/actionTypes';

const partnerUserMeetupReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.UPDATE_PARTNER_USERMEETUP:
      return action.payload;
    default:
      return state;
  }
};

export default partnerUserMeetupReducer;
