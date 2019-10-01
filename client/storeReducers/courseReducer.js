import {
  FETCH_COURSE_ALL,
  FETCH_COURSE,
  FETCH_COURSE_TOPICS,
} from '../actions/actionTypes';

const initialState = {
  allCoursesArr: [],
  singleCourse: {},
  singleCourseWithTopics: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE:
      return { ...state, singleCourse: action.payload };
    case FETCH_COURSE_TOPICS:
      return { ...state, singleCourseWithTopics: action.payload };
    case FETCH_COURSE_ALL:
      return { ...state, allCoursesArr: action.payload };

    default:
      return state;
  }
};

export default courseReducer;
