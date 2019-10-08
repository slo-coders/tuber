import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUserThunk } from '../../../actions/userActions';
import PropTypes from 'prop-types';
import SignUpInput from './SignUpInput';
import SignUpTopics from './SignUpTopics';
import SignUpRateTopics from './SignUpRateTopics';
import { postUserTopicsArrThunked } from '../../../actions/userTopicActions';
import { loginThunked } from '../../../actions/sessionActions';
import { userProfile } from '../../containers/UserProfile/UserProfile';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      topics: [],
      topicsWithRatings: [],
      showForm: true,
      showTopics: false,
      showRatings: false,
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleContinue1 = this.handleContinue1.bind(this);
    this.handleContinue2 = this.handleContinue2.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.newUser || prevProps.newUser.id !== this.props.newUser.id) {
      this.setState({ id: this.props.newUser.id });
    }
  }

  handleSubmit() {
    // Still needs to be set up to get new user ID
    let userInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log('local state ID: ', this.state.id);
    this.props.postTopics(this.state.id, this.state.topicsWithRatings);
    this.props.loginThunked(userInfo);
    window.location = '#/profile';
    this.setState({
      showRatings: false,
      redirect: true,
    });
  }

  handleContinue1() {
    //POSTS NEW USER, SETS IT IN STORE
    const { email, firstName, lastName, password } = this.state;
    this.props.sendUserInfo({
      email,
      password,
      firstName,
      lastName,
    });
    this.setState({
      showForm: false,
      showTopics: true,
      firstName,
      lastName,
      email,
      password,
    });
  }

  handleContinue2() {
    this.setState({
      showTopics: false,
      showRatings: true,
    });
  }

  handleStarClick(e, topicId) {
    const rating = e.target.getAttribute('value');
    this.setState({
      topicsWithRatings: [
        ...this.state.topicsWithRatings,
        Object.assign({}, { topicId: topicId, proficiencyRating: rating }),
      ],
    });
  }

  handleCheckboxChange(e) {
    if (e.target.checked) {
      this.setState({
        topics: [
          ...this.state.topics,
          Object.assign({}, { name: e.target.name, id: e.target.value }),
        ],
      });
    } else {
      this.setState({
        // needs to be updated with Object.assign
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
    const { topics } = this.props.topics;
    if (topics && this.state.showForm) {
      return (
        <SignUpInput
          {...this.state}
          handleInputChange={this.handleInputChange}
          handleContinue={this.handleContinue1}
        />
      );
    }

    if (topics && this.state.showTopics) {
      return (
        <SignUpTopics
          handleCheckboxChange={this.handleCheckboxChange}
          handleContinue={this.handleContinue2}
          {...this.state}
        />
      );
    }

    if (topics && this.state.showRatings) {
      return (
        <SignUpRateTopics
          handleSubmit={this.handleSubmit}
          handleStarClick={this.handleStarClick}
          {...this.state}
        />
      );
    }

    if (this.state.redirect === true) {
      return <userProfile />;
    }
  }
}

const mapStateToProps = state => ({
  topics: state.topics,
  newUser: state.user,
});

const mapDispatchToProps = dispatch => {
  return {
    sendUserInfo: userInfo => dispatch(postUserThunk(userInfo)),
    postTopics: (userId, userTopicsArr) =>
      dispatch(postUserTopicsArrThunked(userId, userTopicsArr)),
    loginThunked: (email, password) => dispatch(loginThunked(email, password)),
  };
};

SignUp.defaultProps = {
  topics: [],
};
SignUp.propTypes = {
  topics: PropTypes.object,
  sendUserInfo: PropTypes.func,
  postTopics: PropTypes.func,
  newUser: PropTypes.object,
  loginThunked: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
