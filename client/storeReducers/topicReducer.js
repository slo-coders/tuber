import {
  FETCH_TOPIC_ALL,
  FETCH_TOPIC,

} from '../actions/actionTypes';

const initialState = {
  topics: [],
  singleTopic: {},
};

const topicReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPIC:
      return { ...state, singleTopic: action.payload };
    case FETCH_TOPIC_ALL:
      return { ...state, topics: action.payload };
    default:
      return state;
  }
};

export default topicReducer;
