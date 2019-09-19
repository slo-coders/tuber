import React from 'react';
import Button from '../../reusables/Button';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default function ChooseRole(props) {
  const buttons = [
    { id: 1, value: 'mentor', buttonText: 'Mentor' },
    { id: 2, value: 'mentee', buttonText: 'Mentee' },
    { id: 3, value: 'peer', buttonText: 'Peer' },
  ];
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
          {buttons.map(info => (
            <Button
              key={info.id}
              value={info.value}
              buttonStyle="is-large is-primary"
              buttonText={info.buttonText}
              handleClick={props.handleRoleChoice}
            />
          ))}
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

ChooseRole.propTypes = {
  handleRoleChoice: PropTypes.func,
};
