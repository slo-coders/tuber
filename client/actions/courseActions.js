import axios from 'axios';
import * as action from './actionTypes';

export const listCoursesThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/courses');
    dispatch({ type: action.FETCH_COURSE_ALL, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const singleCourseTopicsThunk = courseId => async dispatch => {
  try {
    const response = await axios.get(`/api/courses/${courseId}/topics`);
    dispatch({ type: action.FETCH_COURSE_TOPICS, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};
