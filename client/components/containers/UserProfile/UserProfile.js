import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoggedInThunked } from '../../../actions/sessionActions';
import PropTypes from 'prop-types';
import TopicDisplay from './TopicDisplay';
import UserInfoDisplay from './UserInfoDisplay';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLoggedInUser();
  }

  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div className="section">
          {user.authUser.imageUrl ? (
            <UserInfoDisplay userInfo={user.authUser} />
          ) : null}

          {user.authUser.id ? <TopicDisplay userId={user.authUser.id} /> : null}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUser: () => dispatch(fetchLoggedInThunked()),
  };
};

UserProfile.propTypes = {
  user: PropTypes.string,
  getLoggedInUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
