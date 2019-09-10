import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginThunked, fetchLoggedInThunked } from '../actions/sessionActions';

export class LoginForm extends Component{
  constructor() {
    super();
    this.state ={
      email: '',
      password: ''
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Login Form Loaded');
  }
  onHandle(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  onSubmit(ev) {
    ev.preventDefault();
    console.log(this.state);
    console.log('I do nothing meanigful so far, attempting to trigger loginThunked');
    loginThunked;
  }

  render() {
    return(
      <div>
        <form className="LoginForm" onSubmit={ev =>   this.onSubmit(ev)}>
          <label> Email </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="email"
            value={this.state.email}
          />
          <label> Password </label>
          <input
            type="text"
            onChange={this.onHandle}
            name="password"
            value={this.state.password}
          />
          <button
            disabled={
              this.state.email &&
              this.state.password ?
              false : true
            }
          >
            Log In
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginThunked: (userInfo) => dispatch(loginThunked(userInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
