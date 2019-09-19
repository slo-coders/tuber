import React from 'react';
import Button from '../../reusables/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default function ChooseRole(props) {
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="container">
        <div className="level">
          <Button
            value={'mentor'}
            buttonStyle="is-large is-primary"
            buttonText="Mentor"
            handleClick={props.handleRoleChoice}
          />
          <Button
            value={'peer'}
            buttonStyle="is-large is-primary"
            buttonText="Peer"
            handleClick={props.handleRoleChoice}
          />
          <Button
            value={'mentee'}
            buttonStyle="is-large is-primary"
            buttonText="Mentee"
            handleClick={props.handleRoleChoice}
          />
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

ChooseRole.propTypes = {
  handleRoleChoice: PropTypes.func,
};
