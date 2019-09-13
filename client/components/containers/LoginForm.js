import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loginThunked,
  fetchLoggedInThunked,
} from '../../actions/sessionActions';
import PropTypes from 'prop-types';

//save for sever resart

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onHandle(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  async onSubmit(ev) {
    ev.preventDefault();
    await this.props.loginThunked(this.state);
    window.location = '#/profile';
  }

  render() {
    return (
      <div className="column is-one-third">
        <form className="LoginForm" onSubmit={this.onSubmit}>
          <div className="field">
            <div className="control">
              <label> Email </label>
              <input
                type="email"
                onChange={this.onHandle}
                name="email"
                value={this.state.email}
                placeholder="Email"
                className="input"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label> Password </label>
              <input
                type="password"
                onChange={this.onHandle}
                name="password"
                value={this.state.password}
                placeholder="Password"
                className="input"
              />
            </div>
          </div>
          <div className="buttons">
            <button
              disabled={this.state.email && this.state.password ? false : true}
              className="button is-primary"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.defaultProps = {
  loginThunked: loginThunked,
  fetchLoggedInThunked: fetchLoggedInThunked,
};
LoginForm.propTypes = {
  loginThunked: PropTypes.func,
  fetchLoggedInThunked: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  loginThunked: userInfo => dispatch(loginThunked(userInfo)),
  fetchLoggedInThunked: () => dispatch(fetchLoggedInThunked()),
});

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
