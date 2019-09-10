import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginThunked } from '../actions/sessionActions';
// fetchLoggedInThunked import and trigger on component load?

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
    this.props.loginThunked(this.state);
  }

  render() {
    return(
      <div className="column is-one-third">
        <form className="LoginForm" onSubmit={ev =>   this.onSubmit(ev)}>
          <div className='field'>
            <div className='control'>
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
          <div className='field'>
            <div className='control'>
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
          <div className= "buttons">
            <button
              disabled={
                this.state.email &&
                this.state.password ?
                false : true
              }
              className= "button is-primary"
              >
              Log In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginThunked: userInfo => dispatch(loginThunked(userInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(LoginForm);
