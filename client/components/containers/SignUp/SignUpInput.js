import React from 'react';
import Input from '../../reusables/Input';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '../../reusables/Button';
import PropTypes from 'prop-types';

export default function SignUpSubmit(props) {
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="section">
        <div className="container">
          <div className="level">
            <div className="column">
              <form>
                <Input
                  value={props.firstName}
                  name={'firstName'}
                  handleInputChange={props.handleInputChange}
                  type={'text'}
                  placeholder={'First Name'}
                  icon={'grin-alt'}
                />
                <Input
                  value={props.lastName}
                  name={'lastName'}
                  handleInputChange={props.handleInputChange}
                  type={'text'}
                  placeholder={'Last Name'}
                  icon={'grin-alt'}
                />
                <Input
                  value={props.email}
                  name={'email'}
                  handleInputChange={props.handleInputChange}
                  type={'email'}
                  placeholder={'Email'}
                  icon={'envelope'}
                />
                <Input
                  value={props.password}
                  name={'password'}
                  handleInputChange={props.handleInputChange}
                  type={'password'}
                  placeholder={'Choose a Password'}
                  icon={'key'}
                />
              </form>
              <div className="level" style={{ paddingTop: '14px' }}>
                <div className="level-item">
                  <Button
                    handleClick={props.handleContinue}
                    buttonStyle={'is-primary'}
                    buttonText={'Continue'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

SignUpSubmit.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleContinue: PropTypes.func,
  key: PropTypes.string,
  checkboxItem: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
};
