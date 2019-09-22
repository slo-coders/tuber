/* eslint-disable react/prop-types */
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

const CourseSelect = props => {
  let courseList = props.courseOptions;
  console.log('COURSE SELECT', props);
  console.log('Course list in CourseSelect', courseList);
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
              value={course.id} //should probably be course.id?
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
                        `MATH ${course.courseCode} - ${course.courseName}`
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
  courses: [],
  handleCourseChoice: () => {},
};
CourseSelect.propTypes = {
  courses: Proptypes.array,
  handleCourseChoice: Proptypes.func,
};

const mapStateToProps = state => ({
  topics: state.userTopics,
  user: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(CourseSelect);
