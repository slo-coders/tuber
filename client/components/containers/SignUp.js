import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubmitButton from '../reusables/SubmitButton';
import { postUserThunk } from '../../actions/userActions';
import PropTypes from 'prop-types';
import Input from '../reusables/Input';
import CheckBox from '../reusables/CheckBox';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      //imageUrl: '',
      topics: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleSubmit() {
    this.props.sendUserInfo(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  }

  handleCheckboxChange(e) {
    e.preventDefault();
    if (e.target.checked) {
      this.setState({ topics: [...this.state.topics, e.target.value] });
    } else {
      this.setState({
        topics: this.state.topics.filter(topic => topic !== e.target.value),
      });
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    if (this.props.topics.topics) {
      return (
        <div>
          <div className="column is-one-third">
            <Input
              value={this.state.firstName}
              name={'firstName'}
              handleInputChange={this.handleInputChange}
              type={'text'}
              placeholder={'First Name'}
              icon={'envelope'}
            />
            <Input
              value={this.lastName}
              name={'lastName'}
              handleInputChange={this.handleInputChange}
              type={'text'}
              placeholder={'Last Name'}
              icon={'envelope'}
            />
            <Input
              value={this.email}
              name={'email'}
              handleInputChange={this.handleInputChange}
              type={'email'}
              placeholder={'Email'}
              icon={'envelope'}
            />
            <Input
              value={this.password}
              name={'password'}
              handleInputChange={this.handleInputChange}
              type={'password'}
              placeholder={'Choose a Password'}
              icon={'key'}
            />
          </div>
          <div className="column is-one-third">
            {this.props.topics.topics.map(topic => (
              <div key={topic.id}>
                <CheckBox
                  checkboxItem={topic.title}
                  handleCheckboxChange={this.handleCheckboxChange}
                  checked={this.state.checked}
                />
              </div>
            ))}
          </div>
          <div className="column is-one-third">
            <SubmitButton
              handleSubmit={this.handleSubmit}
              buttonStyle={'is-primary'}
              buttonText={'Submit'}
            />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  topics: state.topics,
});

const mapDispatchToProps = dispatch => {
  return {
    sendUserInfo: userInfo => dispatch(postUserThunk(userInfo)),
  };
};

SignUp.defaultProps = {
  topics: [],
};
SignUp.propTypes = {
  topics: PropTypes.object,
};
SignUp.propTypes = {
  sendUserInfo: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
