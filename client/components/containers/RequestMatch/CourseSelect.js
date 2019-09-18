import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
//import Button from '../../reusables/Button';

const CourseSelect = () => {
  //console.log(this.props);
  return (
    <CSSTransitionGroup
    transitionAppear={true}
    transitionName="componentFadeIn"
    transitionAppearTimeout={9000}
    transitionLeaveTimeout={9000}
    transitionEnterTimeout={9000}
    >
      <div>
        I am div
      </div>
    </CSSTransitionGroup>
  );
};

export default CourseSelect;
