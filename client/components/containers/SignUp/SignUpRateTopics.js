import React from 'react';
import StarRating from '../../reusables/StarRating';
import { CSSTransitionGroup } from 'react-transition-group';
import Button from '../../reusables/Button';
import Title from '../../reusables/Title';
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
              <Title
    largeText='Rate Yourself'
    smallText='Please rate your level of proficiency in the topics that you have selected.'
    center={true}
    />
      <div className="section" style={{paddingTop:"30px"}}>
        <div className="container">
        <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child"></div>
                <div
                  className="tile is-child is-6 box tileColor"
                  style={{ borderRadius: '0px' }}
                >
          <div className="level">
            <div className="column" style={{paddingRight: "60px", paddingLeft: "60px", paddingTop: "30px"}}>
              {props.topics.map(topic => (
                <div key={topic.id} className="level">
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
          <div className="tile is-child"></div>
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
