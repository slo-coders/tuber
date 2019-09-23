import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './ChooseRole';
import CourseSelect from './CourseSelect';
import TopicSelect from './TopicSelect';
import { listCoursesThunk } from '../../../actions/courseActions';
import { createUserSessionThunk } from '../../../actions/userSessionActions';
import { fetchLoggedInThunked } from '../../../actions/sessionActions';
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

  handleRoleChoice(e) {
    this.setState({
      userType: e.target.getAttribute('value'),
    });
  }
  handleCourseChoice(e) {
    this.setState({
      courseId: e.target.getAttribute('value'),
    });
  }

  handleTopicChoice(e) {
    this.setState({
      topicId: e.target.getAttribute('value'),
      userId: this.props.user.authUser.id,
    });
  }

  handleSubmit() {
    console.log(
      "RequestMatch's handleSubmit running UserSessionThunk with state: ",
      this.state,
    );
    this.props.createUserSessionThunk(this.state);
    //want to navigate to matchup page post submit
  }

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    console.log('REQUEST MATCH PAGE PROPS', this.props);
    console.log('REQUEST MATCH PAGE STATE', this.state);
    if (!this.state.userType) {
      return <ChooseRole handleRoleChoice={this.handleRoleChoice} />;
    }
    if (this.state.userType && this.state.courseId) {
      return (
        <TopicSelect
          courseId={this.state.courseId}
          handleSubmit={this.handleSubmit}
          handleTopicChoice={this.handleTopicChoice}
          {...this.state}
        />
      );
    }
    if (this.state.userType) {
      return (
        <div className="section">
          <CourseSelect
            userType={this.state.userType}
            courses={this.props.courses}
            handleCourseChoice={this.handleCourseChoice}
          />
        </div>
      );
    }
  }
}

RequestMatch.defaultProps = {
  getCourses: PropTypes.func,
  courses: PropTypes.array,
};
RequestMatch.propTypes = {
  createUserSessionThunk: PropTypes.func,
  user: PropTypes.object,
  getCourses: PropTypes.func,
  courses: PropTypes.array,
};

const mapStateToProps = state => ({
  courses: state.courses.courses,
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
