import {
  GET_ALL_USER_TOPICS,
  POST_USER_TOPICS_ARR,
  UPDATE_USER_TOPIC,

} from '../actions/actionTypes';

const initialState = [];

const userTopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_TOPICS: {
      const newState = action.userTopicsArr;
      return newState; //state.push(action.userTopicsArr)
    }
    case POST_USER_TOPICS_ARR:
      return [...state, action.userTopicsArr];
    case UPDATE_USER_TOPIC:
      return state.map(userTopic =>
        userTopic.id === action.userTopic.id ? action.userTopic : userTopic,
      );
    default:
      return state;
  }
};

export default userTopicsReducer;
