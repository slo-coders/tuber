import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import DisplayStarRating from '../../reusables/DisplayStarRating';

class TopicDisplay extends Component {
  constructor(props) {
    super(props);
    this.ratingToDecimal = this.ratingToDecimal.bind(this);
  }

  ratingToDecimal(rating) {
    const decimal = rating / 100;
    return decimal;
  }

  render() {
    const userTopics = this.props.topicsFromLocal;

    if (userTopics && userTopics.length === 0) {
      return <h5>This user has not selected any topics.</h5>;
    }

    if (userTopics.length > 0) {
      return (
        <div className="tile is-parent" style={{ backgroundColor: '#e8e8e8' }}>
          <div
            className="tile is-child box"
            style={{ backgroundColor: '#e8e8e8' }}
          >
            <CSSTransitionGroup
              transitionAppear={true}
              transitionName="componentFadeIn"
              transitionAppearTimeout={9000}
              transitionLeaveTimeout={9000}
              transitionEnterTimeout={9000}
            >
              <div style={{ padding: '20px' }}>
                <strong>Topics and Proficiencies:</strong>
              </div>
              <div
                style={{
                  paddingRight: '80px',
                  paddingLeft: '40px',
                  paddingTop: '20px',
                }}
              >
                {userTopics.map((topic, idx) => (
                  <div key={idx} className="level">
                    <h5>{topic.topicName}</h5>
                    <div className="level-right">
                      {'  Current Rating:'}
                      <DisplayStarRating score={topic.proficiencyRating} />
                      {'  ' + this.ratingToDecimal(topic.proficiencyRating)}
                    </div>
                  </div>
                ))}
              </div>
            </CSSTransitionGroup>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  topics: state.userTopics,
});

TopicDisplay.defaultProps = {
  topicsFromLocal: [],
};

TopicDisplay.propTypes = {
  topicsFromLocal: PropTypes.array,
  userId: PropTypes.string,
  getUserTopics: PropTypes.func,
  topics: PropTypes.array,
};

export default connect(
  mapStateToProps,
  null,
)(TopicDisplay);
