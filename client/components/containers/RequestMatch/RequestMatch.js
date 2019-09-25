import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './ChooseRole';
import CourseSelect from './CourseSelect';
import TopicSelect from './TopicSelect';
import {
  listCoursesThunk,
  singleCourseTopicsThunk,
} from '../../../actions/courseActions';
import { createUserSessionThunk } from '../../../actions/userSessionActions';
import { getUserTopicsThunked } from '../../../actions/userTopicActions';
import { singleTopicThunk } from '../../../actions/topicActions';
import PropTypes from 'prop-types';

class RequestMatch extends Component {
  constructor(props) {
    super(props);
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
  }

  handleRoleChoice(e) {
    this.setState({
      userType: e.target.getAttribute('value'),
      userId: this.props.user.authUser.id,
    });
  }

  async handleCourseChoice(e) {
    await this.setState({
      courseId: e.target.getAttribute('value'),
    });
    await this.props.getUserTopics(this.state.userId);
    await this.props.setCourseTopics(this.state.courseId); //courses.singleCourseWithTopics ==== {id:, topics: [{title:, id:, }]}
    this.setState({
      topicId: '',
    });
  }

  handleTopicChoice(e) {
    const newTopicId =
      this.state.topicId === e.target.getAttribute('value')
        ? ''
        : e.target.getAttribute('value');
    this.setState({
      topicId: newTopicId,
    });
  }

  async handleSubmit() {
    console.log(
      "RequestMatch's handleSubmit running UserSessionThunk with state: ",
      this.state,
    );
    await this.props.createUserSessionThunk(this.state);
    await this.props.singleTopicThunk(this.state.topicId);
    this.setState({
      userType: '',
      courseId: '',
      topicId: '',
      location: 'library',
      userId: '',
    });
    window.location = '/#/meetuproom';
  }

  render() {
    if (!this.state.userType) {
      return <ChooseRole handleRoleChoice={this.handleRoleChoice} />;
    }

    if (this.state.userType && this.state.courseId) {
      return (
        <div>
          <CourseSelect
            userType={this.state.userType}
            courseOptions={this.props.courses}
            handleCourseChoice={this.handleCourseChoice}
          />
          <TopicSelect
            userType={this.state.userType}
            courseId={this.state.courseId} //not updated by handleCourseChoice
            topicId={this.state.topicId}
            handleSubmit={this.handleSubmit}
            handleTopicChoice={this.handleTopicChoice}
          />
        </div>
      );
    }

    if (this.state.userType && !this.state.courseId) {
      return (
        <div className="section">
          <CourseSelect
            userType={this.state.userType}
            courseOptions={this.props.courses} //from list courses
            handleCourseChoice={this.handleCourseChoice}
          />
        </div>
      );
    }
  }
}

RequestMatch.defaultProps = {
  getCourses: () => {},
  setCourseTopics: () => {},
  courses: [],
};
RequestMatch.propTypes = {
  courses: PropTypes.array,
  user: PropTypes.object,
  createUserSessionThunk: PropTypes.func,
  getCourses: PropTypes.func,
  setCourseTopics: PropTypes.func,
  getUserTopics: PropTypes.func,
  singleTopicThunk: PropTypes.func,
};

const mapStateToProps = state => ({
  courses: state.courses.allCoursesArr,
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  getCourses: () => dispatch(listCoursesThunk()),
  createUserSessionThunk: userData =>
    dispatch(createUserSessionThunk(userData)),
  setCourseTopics: courseId => dispatch(singleCourseTopicsThunk(courseId)),
  getUserTopics: courseId => dispatch(getUserTopicsThunked(courseId)),
  singleTopicThunk: topicId => dispatch(singleTopicThunk(topicId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestMatch);
