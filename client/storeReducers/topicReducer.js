import {
  FETCH_TOPIC_ALL,
  FETCH_TOPIC,
  POST_TOPIC,
  DELETE_TOPIC,
  EDIT_TOPIC,
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
    case POST_TOPIC:
      return { ...state, topics: [...state.topics, action.payload] };
    case EDIT_TOPIC:
      return {
        ...state,
        topics: state.topics.map(el =>
          el.id === action.payload.id ? action.payload : el,
        ),
      };
    case DELETE_TOPIC:
      return {
        ...state,
        topics: state.topics.filter(el => el.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default topicReducer;
