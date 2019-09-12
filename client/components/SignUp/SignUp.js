import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopicSelect from './TopicSelect';
import Form from './Form';
import SubmitButton from './SubmitButton';
import { postUserThunk } from '../../actions/userActions';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      //password2: '',
      //imageUrl: '',
      //topics: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit() {
    console.log('in handleSubmit, this.state:', this.state);
    this.props.sendUserInfo(this.state);
  }

  render() {
    return (
      <div>
        <div className="column is-one-third">
          <Form handleChange={this.handleChange} {...this.state} />
        </div>
        <div className="column is-one-third">
          <TopicSelect />
        </div>
        <div className="column is-one-third">
          <SubmitButton handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendUserInfo: userInfo => dispatch(postUserThunk(userInfo)),
  };
};

SignUp.propTypes = {
  sendUserInfo: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
