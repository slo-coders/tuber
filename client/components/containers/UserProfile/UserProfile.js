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
    console.log('PROFILE', this.props);
    const user = this.props.user;
    console.log('userrrr', user);
    if (user) {
      return (
        <div>
          <section className="hero">
            <div
              className="hero-body"
              style={{ paddingBottom: '0px', paddingTop: '30px' }}
            >
              <div className="container">
                <h1 className="title" style={{ marginBottom: '12px' }}>
                  {'Hello, ' + user.authUser.firstName + '!'}
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, pri quod inimicus disputando cu,
                  sit facilisi abhorreant in. Pri iudico euismod copiosae in,
                  salutatus democritum sit no.
                </p>
              </div>
            </div>
          </section>
          <div className="section" style={{ paddingTop: '30px' }}>
            <div className="container">
              <div className="tile is-ancestor">
                {user.authUser.imageUrl ? (
                  <UserInfoDisplay userInfo={user.authUser} />
                ) : null}

                {user.authUser.id && this.props.topics ? (
                  <TopicDisplay
                    topicsFromLocal={this.props.topics}
                    userId={user.authUser.id}
                  />
                ) : null}
              </div>
            </div>
          </div>
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
