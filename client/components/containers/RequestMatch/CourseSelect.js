import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Proptypes from 'prop-types';

const CourseSelect = props => {
  let courseList = props.courseOptions;

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
              value={course.id}
              key={course.id}
              onClick={props.handleCourseChoice}
            >
              <div value={course.id} className="section">
                <div value={course.id} className="container">
                  <div value={course.id} className="level">
                    <div value={course.id} className="tile is-parent is-vertical is-4">
                      <div value={course.id} className="tile is-child">
                        {`MATH ${course.courseCode} - ${course.courseName}`}
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
  courseOptions: [],
  handleCourseChoice: () => {},
};
CourseSelect.propTypes = {
  courseOptions: Proptypes.array,
  handleCourseChoice: Proptypes.func,
};

export default CourseSelect;
