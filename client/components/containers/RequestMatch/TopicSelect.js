import React, { Component } from 'react';
import { singleCourseTopicsThunk } from '../../../actions/courseActions';
import { connect } from 'react-redux';
import Button from '../../reusables/Button';
import CheckBox from '../../reusables/CheckBox';
import PropTypes from 'prop-types';

class TopicSelect extends Component {
  componentDidMount() {
    this.props.singleCourseTopicsThunk(this.props.courseId);
  }

  render() {
    return (
      <div>
        {this.props.courses[0]
          ? this.props.courses[0].topics.map(topic => (
              <div key={topic.id}>
                <CheckBox
                  checkboxValue={topic.id}
                  checkboxItem={topic.title}
                  handleCheckboxChange={this.props.handleTopicChoice}
                />
              </div>
            ))
          : 'loading...'}
        <Button
          handleClick={this.props.handleSubmit}
          buttonText={'Request Meetup'}
          value={'Request Meetup'}
          disabled={this.props.topicId ? false : true}
        />
      </div>
    );
  }
}

TopicSelect.propTypes = {
  courses: PropTypes.object,
  courseId: PropTypes.string,
  singleCourseTopicsThunk: PropTypes.func,
  handleTopicChoice: PropTypes.func,
  handleSubmit: PropTypes.func,
  topicId: PropTypes.string,
  key: PropTypes.string,
};

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
