import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import Proptypes from 'prop-types';
import Title from '../../reusables/Title';

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
      <Title
        smallText="Select a course below that you would like to work with."
        largeText="Choose a Course"
        center="true"
        style={{ paddingBottom: '0px', paddingTop: '0px' }}
      />
      <div
        className="section"
        style={{ paddingLeft: '285px', paddingRight: '285px' }}
      >
        <div className="container">
          <div className="level">
            {courseList.map(course => {
              return (
                <a
                  value={course.id}
                  key={course.id}
                  onClick={props.handleCourseChoice}
                >
                  <div
                    value={course.id}
                    style={{
                      height: '130px',
                      width: '130px',
                      padding: '20px',
                      backgroundColor: '#F5F5F5',
                      boxShadow:
                        '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)',
                    }}
                  >
                    {`MATH ${course.courseCode} - ${course.courseName}`}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
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
