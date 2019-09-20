import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loginThunked,
  fetchLoggedInThunked,
} from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../reusables/Input';

//save for sever restart

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
      <div className="column is-half is-center">
        <form className="LoginForm" onSubmit={this.onSubmit}>
          <div className="field">
            <div className="control">
              <label> Email </label>
              <Input
                type={'email'}
                handleInputChange={this.onHandle}
                name={'email'}
                value={this.state.email}
                placeholder={"Email"}
                icon={'envelope'}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label> Password </label>
              <Input
                type={'password'}
                handleInputChange={this.onHandle}
                name={'password'}
                value={this.state.password}
                placeholder={"Password"}
                icon={'key'}
              />
            </div>
          </div>
          <div className="button-box_login">
            <button
              disabled={this.state.email && this.state.password ? false : true}
              className="button is-primary"
            >
              Log In
            </button>
            <hr/>
            <Link
              className='button'
              to ='/signup'
            >
              Sign Up
            </Link>
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
