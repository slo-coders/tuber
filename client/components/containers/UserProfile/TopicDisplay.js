import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserTopicsThunked } from '../../../actions/userTopicActions';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import DisplayStarRating from '../../reusables/DisplayStarRating';

class TopicDisplay extends Component {
  constructor(props) {
    super(props);
    this.ratingToDecimal = this.ratingToDecimal.bind(this);
  }

  componentDidMount() {
    this.props.getUserTopics(this.props.userId);
  }

  ratingToDecimal(rating) {
    const decimal = rating / 100;
    return decimal;
  }

  render() {
    const { userTopics } = this.props.topics;

    if (userTopics && userTopics.length === 0) {
      return <h5>This user has not selected any topics.</h5>;
    }

    if (userTopics) {
      console.log(userTopics);
      return (
        <CSSTransitionGroup
          transitionAppear={true}
          transitionName="componentFadeIn"
          transitionAppearTimeout={9000}
          transitionLeaveTimeout={9000}
          transitionEnterTimeout={9000}
        >
          <div className="column is-two-thirds">
            {userTopics[0].topics.map(topic => (
              <div key={topic.id} className="level">
                <h5>{topic.title}</h5>
                <span>
                  {'  Current Rating: '}
                  <DisplayStarRating
                    score={topic.user_topic.proficiencyRating}
                  />
                  {'  ' +
                    this.ratingToDecimal(topic.user_topic.proficiencyRating)}
                </span>
              </div>
            ))}
          </div>
        </CSSTransitionGroup>
      );
    }
  }
}

const mapStateToProps = state => ({
  topics: state.userTopics,
});

const mapDispatchToProps = dispatch => {
  return {
    getUserTopics: userId => dispatch(getUserTopicsThunked(userId)),
  };
};

TopicDisplay.propTypes = {
  userId: PropTypes.string,
  getUserTopics: PropTypes.func,
  topics: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicDisplay);
