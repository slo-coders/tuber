import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default function UserInfoDisplay(props) {
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="container">
        <img src={props.userInfo.imageUrl} />
        <h4>
          Name: {props.userInfo.firstName + ' ' + props.userInfo.lastName}
        </h4>
        <h4>Email Address: {props.userInfo.email}</h4>
      </div>
    </CSSTransitionGroup>
  );
}

UserInfoDisplay.propTypes = {
  userInfo: PropTypes.object,
};
