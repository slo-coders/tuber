import React, { Component } from 'react';
import { singleCourseTopicsThunk } from '../../../actions/courseActions';
import { connect } from 'react-redux';
import Button from '../../reusables/Button';
import CheckBox from '../../reusables/CheckBox';

class TopicSelect extends Component {
  componentDidMount() {
    this.props.singleCourseTopicsThunk(this.props.courseId);
  }

  render() {
    console.log(
      'this.props.topic',this.props.topicId,
    );

    return (
      <div>
        {this.props.courses[0]
          ? this.props.courses[0].topics.map(topic => (
              <div>
                <CheckBox 
                checkboxValue={topic.id}
                checkboxItem={topic.title}
                handleCheckboxChange={this.props.handleTopicChoice}
                
                />
                {/* <a onClick={this.props.handleTopicChoice} value={topic.id}>
                  {topic.title}
                </a> */}
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
