import React from 'react';
import { singleCourseTopicsThunk } from '../../../actions/courseActions';
import { connect } from 'react-redux';
import Button from '../../reusables/Button';
import PropTypes from 'prop-types';
import DisplayStarRating from '../../reusables/DisplayStarRating';

class TopicSelect extends React.Component {
  componentDidMount() {
    this.props.singleCourseTopicsThunk(this.props.courseId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topics.length !== this.props.topics.length) {
      //is this really a thing?!?!
      this.render();
    }
  }

  //TODO: Put stars next to topic names.

  render() {
    console.log('TOPIC SELECT', this.props);
    console.log('UserTopics in TopicSelect: ', this.props.topics);
    console.log('topicId required for enabling button: ', this.props.topicId);

    if (
      this.props.course.topics === undefined ||
      this.props.userType === undefined
    )
      return null;
    const selectedCourseTopicsIds = this.props.course.topics.map(
      topic => topic.id,
    );
    console.log('SELECTED COURSE TOPICS', selectedCourseTopicsIds); //single course with topics
    return (
      <div>
        <div>
          {this.props.topics.length > 0 ? ( //userTopics
            <div>
              <form>
                {this.props.topics //usertopics
                  .filter(item =>
                    selectedCourseTopicsIds.includes(item.topicId),
                  )
                  .map((uTop, idx) =>
                    this.props.userType === 'mentor' ? (
                      <div key={idx}>
                        <li>{uTop.topicName}</li>
                      </div>
                    ) : (
                      //mentor's topics w/o radio buttons
                      <div className="radio" key={uTop.id}>
                        <label htmlFor="radioButton">
                          <input
                            name="radioButton"
                            type="radio"
                            value={uTop.topicId}
                            onChange={this.props.handleTopicChoice}
                          />
                          {uTop.topicName}
                        </label>
                      </div>
                    ),
                  )}
              </form>
            </div>
          ) : (
            'No topics found for this course; please select another course.'
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
    );
  }
}

TopicSelect.defaultProps = {
  userType: '',
};

TopicSelect.propTypes = {
  course: PropTypes.object,
  courseId: PropTypes.string,
  singleCourseTopicsThunk: PropTypes.func,
  handleTopicChoice: PropTypes.func,
  handleSubmit: PropTypes.func,
  topicId: PropTypes.string,
  key: PropTypes.string,
  topics: PropTypes.array,
  userType: PropTypes.string,
};

const mapStateToProps = state => ({
  course: state.courses.singleCourseWithTopics,
  topics: state.userTopics,
});

const mapDispatchToProps = dispatch => ({
  singleCourseTopicsThunk: courseId =>
    dispatch(singleCourseTopicsThunk(courseId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopicSelect);

{
  /* this.props.courses[0].topics.map((topic, idx) => (
              <div key={idx}>
                <CheckBox
                  checkboxValue={topic.id}
                  checkboxItem={topic.title}
                  handleCheckboxChange={this.props.handleTopicChoice}
                />
              </div>
            ))*/
}
