import React, { Component } from 'react';
import { singleCourseTopicsThunk } from '../../../actions/courseActions';
import { connect } from 'react-redux';
import Button from '../../reusables/Button'

class TopicSelect extends Component {
  componentDidMount() {
    this.props.singleCourseTopicsThunk(this.props.courseId);
  }


  render() {
    console.log(
      this.props.courses[0] ? this.props.courses[0].topics : 'nothing yet',
    );

    return <div>{this.props.courses[0]
      ? this.props.courses[0].topics.map(topic => (
          <div>
            <a onClick={this.props.handleTopicChoice} value={topic.id}>{topic.title}</a>
          </div>
        ))
      : 'loading...'}
      < Button handleClick={this.props.handleSubmit}
      buttonText={'Request Meetup'}
      value={'Request Meetup'}
      />
      </div>
  }
}

const mapStateToProps = state => ({
  courses: state.courses.singleCourseWithTopics,
});

const mapDispatchToProps = dispatch => ({
  singleCourseTopicsThunk: courseId =>
    dispatch(singleCourseTopicsThunk(courseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicSelect);
