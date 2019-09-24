import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../../reusables/Title';
import StarRating from '../../reusables/StarRating';
import { updatePartnerUserMeetupThunk } from '../../../actions/partnerActions';

class Review extends Component {
  constructor() {
    super();
    this.state = {
      proficiencyRating: 0,
      topicId: '',
    };
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleStarClick(e, topicId) {
    const rating = e.target.getAttribute('value');
    this.setState({
      proficiencyRating: rating,
      topicId: topicId,
    });
  }

  handleSubmit() {
    //////////////////NOT UPDATING thunk is not being called
    this.props.updatePartnerUserMeetupThunk(
      this.props.user.authUser.id,
      this.props.userMeetup.meetupId,
      { proficiencyRating: this.state.proficiencyRating, status: 'completed' },
    );
    window.location = '/profile';
  }

  render() {
    console.log('Review Component', this.props);
    return (
      <div>
        <Title
          largeText="Review Your Partner"
          smallText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. "
        />
        <div className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child"></div>
                <div className="tile is-child is-6 box tileColor">
                  <strong>
                    {
                      'Please rate (name goes here) proficiency in the folowing topic:'
                    }
                  </strong>
                  <br />
                  <br />
                  <div className="level">
                    <p>Topic name goes here:</p>

                    <StarRating
                      // pass in topicId here, it will get sent back to this state with score when user clicks on star
                      topic={'topic id gets passed in here'}
                      handleStarClick={this.handleStarClick}
                    />
                  </div>
                </div>
                <div className="tile is-child"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {' '}
          <button onClick={this.handleSubmit} className="button">
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  userMeetup: state.userMeetup,
  partner: state.partner,
  pairedUserMeetups: state.pairedUserMeetups,
});

const mapDispatchToProps = dispatch => ({
  updatePartnerUserMeetupThunk: (userId, meetupId, data) =>
    dispatch(updatePartnerUserMeetupThunk(userId, meetupId, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Review);
