import React from 'react';
import CheckBox from '../../reusables/CheckBox';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '../../reusables/Button';
import PropTypes from 'prop-types';

function SignUpTopics(props) {
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
              {props.topics.topics.map(topic => (
                <div key={topic.id}>
                  <CheckBox
                    checkboxValue={topic.id}
                    checkboxItem={topic.title}
                    handleCheckboxChange={props.handleCheckboxChange}
                    checked={props.checked}
                  />
                </div>
              ))}
              <div className="container">
                <div className="level">
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
      </div>
    </CSSTransitionGroup>
  );
}

const mapStateToProps = state => ({
  topics: state.topics,
});

SignUpTopics.propTypes = {
  topics: PropTypes.object,
  handleCheckboxChange: PropTypes.func,
  checked: PropTypes.string,
  handleContinue: PropTypes.func,
};

export default connect(
  mapStateToProps,
  null,
)(SignUpTopics);
