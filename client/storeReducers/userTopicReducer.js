import {
  GET_ALL_USER_TOPICS,
  POST_USER_TOPICS_ARR,
  UPDATE_USER_TOPIC,
  DELETE_USER_TOPIC
} from './actionTypes';

const initialState = {
  userTopics: [],
};

const userTopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_TOPICS:
    case POST_USER_TOPICS_ARR:
      return action.userTopicsArr;
    case UPDATE_USER_TOPIC:
      return state.map(userTopic => userTopic.id === action.userTopic.id 
        ? action.userTopic : userTopic);
    case DELETE_USER_TOPIC:
      return state.filter(userTopic => userTopic.topicId !== action.deletedTopicId);
    default:
      return state;
  }
};

export default userTopicsReducer;
