import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const CourseSelect = (props) => {
  let courseList = props.courses
  return (
    <CSSTransitionGroup
    transitionAppear={true}
    transitionName="componentFadeIn"
    transitionAppearTimeout={9000}
    transitionLeaveTimeout={9000}
    transitionEnterTimeout={9000}
    >
      <div className='columns'>
        {courseList.map( course => {
          return(
            <div key={course.id} className='section'>
              <div className='container'>
                <div className='level'>
                  <div className='section'>
                    <div>
                      MAT{course.courseCode}
                    </div>
                    {course.courseName}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </CSSTransitionGroup>
  );
};


export default CourseSelect;
