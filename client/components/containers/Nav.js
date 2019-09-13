import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LogoutThunked } from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import Button from '../reusables/Button';

export class Nav extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(ev) {
    ev.preventDefault();
    this.props.LogoutThunked();
    window.location = '/#home';
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/home">
              Home
            </Link>
            <Link className="navbar-item" to="/profile">
              Profile
            </Link>
            <Link
              className="navbar-item"
              to="/request_match" /* path will eventually depend on match status, this is a placeholder */
            >
              Matches
            </Link>
            <div className="navbar-item">
              <Button
                handleClick={this.logout}
                buttonStyle={'is-primary'}
                buttonText={'Logout'}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Nav.defaultProps = {
  LogoutThunked: PropTypes.func,
};
Nav.propTypes = {
  LogoutThunked: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  LogoutThunked: () => dispatch(LogoutThunked()),
});

export default connect(
  null,
  mapDispatchToProps,
)(Nav);
