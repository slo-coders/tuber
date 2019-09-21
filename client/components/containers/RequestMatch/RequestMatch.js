import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './ChooseRole';
import CourseSelect from './CourseSelect';
import TopicSelect from './TopicSelect';
import { listCoursesThunk } from '../../../actions/courseActions';
import { createUserSessionThunk } from '../../../actions/userSessionActions';
import { fetchLoggedInThunked } from '../../../actions/sessionActions';
import PropTypes from 'prop-types';

class RequestMatch extends Component {
  constructor() {
    super();
    this.state = {
      userType: '',
      courseId: '',
      topicId: '',
      location: 'library',
      userId: '',
      disabled: true,
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
    this.props.createUserSessionThunk(this.state);
  }

  componentDidMount() {
    this.props.getLoggedInUser();
    this.props.getCourses();
  }

  render() {
    if (!this.state.userType) {
      return (
        <div className="section">
          <ChooseRole handleRoleChoice={this.handleRoleChoice} />
        </div>
      );
    }
    if (
      this.state.userType &&
      this.state.courseId
    ) {
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
  getCourses: PropTypes.func,
  courses: PropTypes.array,
};

const mapStateToProps = state => ({
  courses: state.courses.courses,
  user: state.auth,
});
const mapDispatchToProps = dispatch => ({
  getCourses: () => dispatch(listCoursesThunk()),
  // singleCourseThunk: courseId => dispatch(singleCourseThunk),
  getLoggedInUser: () => dispatch(fetchLoggedInThunked()),
  createUserSessionThunk: userData =>
    dispatch(createUserSessionThunk(userData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestMatch);
