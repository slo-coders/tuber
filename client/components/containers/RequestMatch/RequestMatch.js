import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './ChooseRole';
import CourseSelect from './CourseSelect';
import { listCoursesThunk } from '../../../actions/courseActions';
import PropTypes from 'prop-types';


class RequestMatch extends Component {
  constructor() {
    super();
    this.state = {
      role: '',
      course: '',
    };
    this.handleRoleChoice = this.handleRoleChoice.bind(this);
    this.handleCourseChoice = this.handleCourseChoice.bind(this);
  }

  handleRoleChoice(e) {
    this.setState({
      role: e.target.getAttribute('value'),
    });
  }
  handleCourseChoice(e) {
    this.setState({
      course: e.target.getAttribute('value')
    });
  }

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    console.log(this.state);
    if (!this.state.role) {
      return (
        <div className="section">
          <ChooseRole handleRoleChoice={this.handleRoleChoice} />
        </div>
      );
    }
    if (this.state.role) {
      return (
        <div className='section'>
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
  courses: PropTypes.array
};
RequestMatch.propTypes = {
  getCourses: PropTypes.func,
  courses: PropTypes.array
};

const mapStateToProps = state => ({
  courses: state.courses.courses
});
const mapDispatchToProps = dispatch => ({
  getCourses: () => dispatch(listCoursesThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestMatch);
