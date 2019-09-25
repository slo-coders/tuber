import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  loginThunked,
  fetchLoggedInThunked,
} from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Input from '../reusables/Input';
import Button from '../reusables/Button-b';

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
      <form className="LoginForm" onSubmit={this.onSubmit}>
        <div className="field">
          <div className="control">
            <Input
              type={'email'}
              handleInputChange={this.onHandle}
              name={'email'}
              value={this.state.email}
              placeholder={'Email'}
              icon={'envelope'}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <Input
              type={'password'}
              handleInputChange={this.onHandle}
              name={'password'}
              value={this.state.password}
              placeholder={'Password'}
              icon={'key'}
            />
          </div>
        </div>
        <div className="buttons" style={{ justifyContent: 'center' }}>
          <Button
            disabled={this.state.email && this.state.password ? false : true}
            handleClick={this.onSubmit}
            buttonStyle={'is-primary'}
            buttonText={'Log In'}
            divStyle={''}
            customButtonStyle={{ marginRight: '5px' }}
          />

          <Link className="button" to="/signup" style={{ marginLeft: '5px' }}>
            Sign Up
          </Link>
        </div>
      </form>
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

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(LoginForm),
);
