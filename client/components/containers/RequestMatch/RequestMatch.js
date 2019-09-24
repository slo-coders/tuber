import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './ChooseRole';
import CourseSelect from './CourseSelect';
import TopicSelect from './TopicSelect';
import { listCoursesThunk } from '../../../actions/courseActions';
import { createUserSessionThunk } from '../../../actions/userSessionActions';
import PropTypes from 'prop-types';

//TODO: Render and submit topics based on a course for Mentors
//TODO: Render and submit selected topics for either mentee or peer
//NOTE: This componet has local state that can be utilized

class RequestMatch extends Component {
  constructor() {
    super();
    this.state = {
      userType: '',
      courseId: '',
      topicId: '',
      location: 'library',
      userId: '',
    };
    this.handleRoleChoice = this.handleRoleChoice.bind(this);
    this.handleCourseChoice = this.handleCourseChoice.bind(this);
    this.handleTopicChoice = this.handleTopicChoice.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCourses();
    //TODO: Check 'status' of UserMeetup instance

    //TODO: On mount of RequestMatch component, check all UserMeetups are 'completed', else redirect to Chatroom (if status === 'matched'), Review (if status === 'pending review'), or "Confirm [reach goal]" (if status === 'pending confirmation')
    //TODO: In RequestMatch component, if partner is key in response in "pairedUserMeetup", change UserMeetup statuses to 'matched'.
  }

  /*  componentDidUpdate(prevProps) {
    if (prevProps.courses !== this.props.courses) {
      this.props.getCourses();
    }
  } */

  handleRoleChoice(e) {
    this.setState({
      userType: e.target.getAttribute('value'),
      userId: this.props.user.authUser.id,
    });
  }
  handleCourseChoice(e) {
    this.setState({
      courseId: e.target.getAttribute('value'), // from course in courseOptions sent to CourseSelect
    });
  }

  handleTopicChoice(e) {
    this.setState({
      topicId: e.target.getAttribute('value'),
    });
  }

  handleSubmit() {
    console.log(
      "RequestMatch's handleSubmit running UserSessionThunk with state: ",
      this.state,
    );
    this.props.createUserSessionThunk(this.state);
    window.location = '/#/meetuproom';
  }

  render() {
    console.log('REQUEST MATCH PAGE PROPS', this.props);
    console.log('REQUEST MATCH PAGE STATE', this.state);
    if (!this.state.userType) {
      return <ChooseRole handleRoleChoice={this.handleRoleChoice} />;
    }

    if (this.state.userType && this.state.courseId) {
      return (
        <div>
          <CourseSelect
            userType={this.state.userType}
            courseOptions={this.props.courses} //from list course
            handleCourseChoice={this.handleCourseChoice}
          />
          <TopicSelect
            handleSubmit={this.handleSubmit}
            handleTopicChoice={this.handleTopicChoice}
            {...this.state} //courseId...
          />
        </div>
      );
    }
    if (this.state.userType) {
      return (
        <div className="section">
          <CourseSelect
            userType={this.state.userType}
            courseOptions={this.props.courses} //from list course
            handleCourseChoice={this.handleCourseChoice}
          />
        </div>
      );
    }
  }
}

RequestMatch.defaultProps = {
  getCourses: () => {},
  courses: [],
};
RequestMatch.propTypes = {
  createUserSessionThunk: PropTypes.func,
  user: PropTypes.object,
  getCourses: PropTypes.func,
  courses: PropTypes.array,
};

const mapStateToProps = state => ({
  courses: state.courses.allCoursesArr,
  user: state.auth,
});
const mapDispatchToProps = dispatch => ({
  getCourses: () => dispatch(listCoursesThunk()),
  createUserSessionThunk: userData =>
    dispatch(createUserSessionThunk(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestMatch);
