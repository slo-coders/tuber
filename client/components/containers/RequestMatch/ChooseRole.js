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
  console.log('CHOOSE ROLE:', props);
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
        <p>Placeholder text goes here</p>
      </div>
          <div className="level" >
          {buttons.map(info => (
            <div className="column" style={{textAlign:"center", padding:"0px"}}>
                   <img
                   style={{height:"250px", width:"200px"}}
                   src="https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg"/>
            <Button
              customDivStyle={{margin:'14px'}}
              divStyle={'centerInDiv'}
              key={info.id}
              value={info.value}
              buttonStyle="is-large is-primary centerItem"
              buttonText={info.buttonText}
              handleClick={props.handleRoleChoice}
            />
            </div>
          ))}
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

ChooseRole.propTypes = {
  handleRoleChoice: PropTypes.func,
};
