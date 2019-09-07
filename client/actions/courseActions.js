import axios from 'axios';

import {
  FETCH_COURSE_ALL,
  FETCH_COURSE,
  POST_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
} from './actionTypes';

export const listCoursesThunk = () => async dispatch => {
  try {
    const response = await axios.get('/api/courses');
    dispatch({ type: FETCH_COURSE_ALL, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const singleCourseThunk = courseID => async dispatch => {
  try {
    const response = await axios.get(`/api/courses/${courseID}`);
    dispatch({ type: FETCH_COURSE, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const postCourseThunk = course => async dispatch => {
  try {
    const response = await axios.post('/api/courses', course);
    dispatch({ type: POST_COURSE, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const editCourseThunk = (courseId, info) => async dispatch => {
  try {
    const response = await axios.put(`/api/courses/${courseId}`, info);
    dispatch({ type: EDIT_COURSE, payload: response.data });
  } catch (e) {
    console.error(e);
  }
};

export const deleteCourseThunk = course => async dispatch => {
  try {
    await axios.delete(`/api/courses/${course.id}`);
    dispatch({ type: DELETE_COURSE, payload: course });
  } catch (e) {
    console.error(e);
  }
};
