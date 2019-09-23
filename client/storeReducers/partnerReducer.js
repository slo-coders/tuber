import * as actions from '../actions/actionTypes';

const partnerReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.FETCH_PARTNER:
      return action.payload;
    default:
      return state;
  }
};

export default partnerReducer;
