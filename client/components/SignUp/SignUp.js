import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopicSelect from './TopicSelect';
import Form from './Form';
import SubmitButton from './SubmitButton';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      topics: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
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
          <SubmitButton />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(SignUp);
