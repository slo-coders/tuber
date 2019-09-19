import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseSelect from './CourseSelect';
import { listCoursesThunk } from '../../../actions/courseActions';
import PropTypes from 'prop-types';


export class RequestMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <h4>The Request Match component is under construction.</h4>
      <CourseSelect/>
      </div>
    );
  }
}

RequestMatch.defaultProps = {
  getCourses: PropTypes.func,
};
RequestMatch.propTypes = {
  getCourses: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  getCourses: () => dispatch(listCoursesThunk())
});

export default connect(
  null,
  mapDispatchToProps,
)(RequestMatch);
