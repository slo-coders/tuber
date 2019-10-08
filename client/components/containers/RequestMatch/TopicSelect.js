import React from 'react';
import { singleCourseTopicsThunk } from '../../../actions/courseActions';
import { connect } from 'react-redux';
import Button from '../../reusables/Button-b';
import PropTypes from 'prop-types';

class TopicSelect extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.courseWithTopics) !==
      JSON.stringify(this.props.courseWithTopics)
    ) {
      this.props.getSingleCourseTopics(this.props.courseId);
    }
  }

  //TODO: Put stars next to topic names.

  render() {
    const courseTopics =
      this.props.courseWithTopics && this.props.courseWithTopics.topics;

    if (courseTopics && courseTopics.length && this.props.userTopics) {
      const selectedCourseTopicsIds = courseTopics.map(topic => topic.id);

      const userTopicsForCourse = this.props.userTopics.filter(item =>
        selectedCourseTopicsIds.includes(item.topicId),
      );

      // <div className="section" style={{paddingTop: "115px", paddingRight:'300px', paddingLeft:'300px'}}>
      // <div className="container">
      // <div className="tile is-ancestor">
      // <div className="tile is-parent">
      // <div className="tile is-child box">
      return (
        <div
          className="section"
          style={{ textAlign: 'center', paddingTop: '0px' }}
        >
          <div>
            <div>
              {userTopicsForCourse && userTopicsForCourse.length > 0 ? (
                <form>
                  {userTopicsForCourse.map(uTop => {
                    const radioName = `${uTop.topicName
                      .split(' ')
                      .join('-')}-Radio`;
                    return this.props.userType === 'mentor' ? (
                      <div key={uTop.id}>
                        <li key={uTop.id}>{uTop.topicName}</li>
                      </div>
                    ) : (
                      //mentee/peer topics w/ radio buttons
                      <div className="radio" key={uTop.id}>
                        <label key={uTop.id} htmlFor={radioName}>
                          <input
                            key={uTop.id}
                            name={radioName}
                            type="radio"
                            value={uTop.topicId}
                            onChange={this.props.handleTopicChoice}
                            checked={this.props.topicId === uTop.topicId}
                          />
                          {uTop.topicName}
                        </label>
                      </div>
                    );
                  })}
                </form>
              ) : (
                <div>
                  <p>
                    {
                      'You do not appear to have any proficiency ratings for the topics in this selected course.'
                    }
                  </p>
                  <p>{'Please select another course.'}</p>
                </div>
              )}
            </div>
            <Button
              handleClick={this.props.handleSubmit} //createUserSessionThunk
              buttonText={'Request Meetup'}
              value={'Request Meetup'}
              disabled={
                this.props.topicId ||
                (this.props.userType === 'mentor' &&
                  selectedCourseTopicsIds.length > 0)
                  ? false
                  : true
              }
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p>{'Fetching course topics...'}</p>
        </div>
      );
    }
  }
}

TopicSelect.defaultProps = {
  userType: '',
};

TopicSelect.propTypes = {
  courseWithTopics: PropTypes.object,
  courseId: PropTypes.string,
  getSingleCourseTopics: PropTypes.func,
  handleTopicChoice: PropTypes.func,
  handleSubmit: PropTypes.func,
  topicId: PropTypes.string,
  key: PropTypes.string,
  userTopics: PropTypes.array,
  userType: PropTypes.string,
};

const mapStateToProps = state => ({
  courseWithTopics: state.courses.singleCourseWithTopics, // courses.singleCourseWithTopics ==== {id:, topics: [{title:, id:, }]}
  userTopics: state.userTopics, // userTopics === [{proficienctyRating:, topicId:, topicName:}] !=== courseTopics
});

const mapDispatchToProps = dispatch => ({
  getSingleCourseTopics: courseId =>
    dispatch(singleCourseTopicsThunk(courseId)), //sets state.courses.singleCourseWithTopics
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicSelect);
