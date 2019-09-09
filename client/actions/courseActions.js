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

export const singleCourseThunk = courseId => async dispatch => {
  try {
    const response = await axios.get(`/api/courses/${courseId}`);
    dispatch({ type: action.FETCH_COURSE, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const postCourseThunk = course => async dispatch => {
  try {
    const response = await axios.post('/api/courses', course);
    dispatch({ type: action.POST_COURSE, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const editCourseThunk = (courseId, info) => async dispatch => {
  try {
    const response = await axios.put(`/api/courses/${courseId}`, info);
    dispatch({ type: action.EDIT_COURSE, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const deleteCourseThunk = courseId => async dispatch => {
  try {
    await axios.delete(`/api/courses/${courseId}`);
    dispatch({ type: action.DELETE_COURSE, payload: courseId });
  } catch (e) {
    console.error(e);
  }
};
