import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoggedInThunked } from '../../../actions/sessionActions';
import PropTypes from 'prop-types';
import TopicDisplay from './TopicDisplay';
import UserInfoDisplay from './UserInfoDisplay';
import { getUserTopicsThunked } from '../../../actions/userTopicActions';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUserTopics(this.props.user.authUser.id);
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.user.authUser ||
      prevProps.user.authUser.id !== this.props.user.authUser.id
    ) {
      this.props.getUserTopics(this.props.user.authUser.id);
    }
  }

  render() {
    const user = this.props.user;
    if (user) {
      return (
        <div className="section">
          {user.authUser.imageUrl ? (
            <UserInfoDisplay userInfo={user.authUser} />
          ) : null}
          {user.authUser.id ? (
            <TopicDisplay
              topicsFromLocal={this.props.topics}
              userId={user.authUser.id}
            />
          ) : null}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  topics: state.userTopics,
});

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUser: () => dispatch(fetchLoggedInThunked()),
    getUserTopics: userId => dispatch(getUserTopicsThunked(userId)),
  };
};

UserProfile.defaultProps = {
  topics: [],
};

UserProfile.propTypes = {
  getUserTopics: PropTypes.func,
  user: PropTypes.object,
  topics: PropTypes.array,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
