import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default function UserInfoDisplay(props) {
  return (
    <div className="tile is-3 is-parent">
      <div className="tile is-child box tileColor">
        <CSSTransitionGroup
          transitionAppear={true}
          transitionName="componentFadeIn"
          transitionAppearTimeout={9000}
          transitionLeaveTimeout={9000}
          transitionEnterTimeout={9000}
        >
          <div style={{ textAlign: 'center' }}>
            <img id="profile" src={props.userInfo.imageUrl} />
          </div>
          <p>
            Name: {props.userInfo.firstName + ' ' + props.userInfo.lastName}
          </p>
          <p>Email Address: {props.userInfo.email}</p>
        </CSSTransitionGroup>
      </div>
    </div>
  );
}

UserInfoDisplay.propTypes = {
  userInfo: PropTypes.object,
};
