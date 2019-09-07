import {
  FETCH_COURSE_ALL,
  FETCH_COURSE,
  POST_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
} from '../actions/actionTypes';

const initialState = {
  courses: [],
  singleCourse: {},
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE:
      return { ...state, singleCourse: action.payload };

    case FETCH_COURSE_ALL:
      return { ...state, courses: action.payload };

    case POST_COURSE:
      return { ...state, singleCourse: [...state.courses, action.payload] };

    case EDIT_COURSE:
      return {
        ...state,
        courses: state.courses.map(el =>
          el.id === action.payload.id ? action.payload : el,
        ),
      };

    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(el => el.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default courseReducer;