import { RECEIVED_MESSAGE } from '../actions/actionTypes';

const initialState = {
  messages: [],
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages.action.payload] };
    default:
      return state;
  }
};

export default socketReducer;
