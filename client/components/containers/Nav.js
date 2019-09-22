import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutThunked } from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import Button from '../reusables/Button';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  logout(ev) {
    ev.preventDefault();
    this.props.logoutThunked();
    window.location = '/';
  }

  render() {
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
                to="/request_match" /* path will eventually depend on match status, this is a placeholder */
              >
                Meetups
              </Link>

              <Link className="navbar-item" to="/chatroom">
                Chat Room
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
  logoutThunked: PropTypes.func,
  user: PropTypes.object,
  authUser: PropTypes.object,
  id: PropTypes.string,
};
Nav.propTypes = {
  logoutThunked: PropTypes.func,
  user: PropTypes.object,
  authUser: PropTypes.func,
  id: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  logoutThunked: () => dispatch(logoutThunked()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nav);
