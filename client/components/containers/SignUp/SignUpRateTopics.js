import React from 'react';
import StarRating from '../../reusables/StarRating';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '../../reusables/Button';
import PropTypes from 'prop-types';

function SignUpRateTopics(props) {
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
              {props.topics.map(topic => (
                <div key={topic.id}>
                  <p>{topic.name}</p>
                  <StarRating
                    handleStarClick={props.handleStarClick}
                    topic={topic.id}
                  />
                </div>
              ))}
              <div className="container">
                <div className="level">
                  <div className="level-item">
                    <Button
                      handleClick={props.handleSubmit}
                      buttonStyle={'is-primary'}
                      buttonText={'Submit'}
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

SignUpRateTopics.propTypes = {
  topics: PropTypes.array,
  handleStarClick: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default SignUpRateTopics;
