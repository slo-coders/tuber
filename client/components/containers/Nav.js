/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutThunked } from '../../actions/sessionActions';
import { getUserMeetupDataThunked } from '../../actions/userMeetupActions';
import PropTypes from 'prop-types';
import Button from '../reusables/Button';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.props.getUserMeetup(this.props.user.authUser.id);
  }

  componentDidUpdate(prevProps) {
    const prevUserId = prevProps.user.authUser && prevProps.user.authUser.id;
    const currentUserId =
      this.props.user.authUser && this.props.user.authUser.id;
    const prevUserMeetupId = prevProps.userMeetup && prevProps.userMeetup.id;
    const currentUserMeetupId =
      this.props.userMeetup && this.props.userMeetup.id;
    if (
      prevUserId !== currentUserId ||
      prevUserMeetupId !== currentUserMeetupId
    ) {
      this.props.getUserMeetup(this.props.user.authUser.id);
    }
  }

  logout(ev) {
    ev.preventDefault();
    this.props.logoutThunked();
    window.location = '/';
  }

  render() {
    console.log('NAV-BAR', this.props);
    return (
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <div
            className="navbar-burger burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {this.props.user.authUser.id ? (
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
              <Link className="navbar-item" to="/profile">
                Profile
              </Link>
              <Link
                className="navbar-item"
                to={
                  this.props.userMeetup &&
                  this.props.userMeetup.status === 'pending confirmation'
                    ? '/request_match' //"/confirm_match"
                    : this.props.userMeetup &&
                      this.props.userMeetup.status === 'pending review'
                    ? '/review'
                    : this.props.userMeetup &&
                      this.props.userMeetup.status === 'matched'
                    ? '/meetuproom'
                    : '/request_match'
                } /* path will eventually depend on match status, this is a placeholder */
              >
                Meetups
              </Link>

              <Link className="navbar-item" to="/chatroom">
                Chat Room
              </Link>

              <Link className="navbar-item" to="/review">
                Review
              </Link>

              <div className="navbar-item">
                <Button
                  handleClick={this.logout}
                  buttonStyle={'is-primary is-small'}
                  buttonText={'Logout'}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">
                Home
              </Link>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

Nav.defaultProps = {
  logoutThunked: () => {},
  user: {},
  authUser: {},
  id: '',
};
Nav.propTypes = {
  logoutThunked: PropTypes.func,
  user: PropTypes.object,
  authUser: PropTypes.object,
  id: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.auth,
  userMeetup: state.userMeetup,
});

const mapDispatchToProps = dispatch => ({
  logoutThunked: () => dispatch(logoutThunked()),
  getUserMeetup: userId => dispatch(getUserMeetupDataThunked(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
