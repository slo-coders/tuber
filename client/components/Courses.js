import React from 'react';
import { listCoursesThunk } from '../actions/courseActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Courses extends React.Component {
  componentDidMount() {
    this.props.listCourses();
    console.log(this.props)
  }
  render() {
    const { courses } = this.props.courses;
    if (courses === undefined) return null;
    return (
      <div>
        This is the courses component
        {courses.map(item => (
          <div key={item.id}>{item.courseName}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  courses: state.courses,
});

const mapDispatchToProps = dispatch => {
  return {
    listCourses: () => dispatch(listCoursesThunk()),
  };
};

Courses.defaultProps = {
  courses: [],
};
Courses.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object),
  listCourses: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Courses);
