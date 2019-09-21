<<<<<<< HEAD
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Proptypes from 'prop-types';

const CourseSelect = props => {
  let courseList = props.courses;
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="tile is-ancestor">
        {courseList.map(course => {
          return (
            <a
              value={course.courseName}
              key={course.id}
              onClick={props.handleCourseChoice}
            >
              <div value={course.courseName} className="section">
                <div value={course.courseName} className="container">
                  <div value={course.courseName} className="level">
                    <div
                      value={course.courseName}
                      className="tile is-parent is-vertical is-4"
                    >
                      <div value={course.id} className="tile is-child">
                        MAT{course.courseCode}
                        {course.courseName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </CSSTransitionGroup>
  );
};

CourseSelect.defaultProps = {
  courses: Proptypes.array,
  handleCourseChoice: Proptypes.func,
};
CourseSelect.propTypes = {
  courses: Proptypes.array,
  handleCourseChoice: Proptypes.func,
};

export default CourseSelect;
=======
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Proptypes from 'prop-types';

const CourseSelect = props => {
  let courseList = props.courses;
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="tile is-ancestor">
        {courseList.map(course => {
          return (
            <a
              value={course.courseName}
              key={course.id}
              onClick={props.handleCourseChoice}
            >
              <div value={course.courseName} className="section">
                <div value={course.courseName} className="container">
                  <div value={course.courseName} className="level">
                    <div
                      value={course.courseName}
                      className="tile is-parent is-vertical is-4"
                    >
                      <div value={course.courseName} className="tile is-child">
                        MAT{course.courseCode}
                        {course.courseName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </CSSTransitionGroup>
  );
};

CourseSelect.defaultProps = {
  courses: Proptypes.array,
  handleCourseChoice: Proptypes.func,
};
CourseSelect.propTypes = {
  courses: Proptypes.array,
  handleCourseChoice: Proptypes.func,
};

export default CourseSelect;
>>>>>>> dev
