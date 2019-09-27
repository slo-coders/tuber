/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../../reusables/Title';
import StarRating from '../../reusables/StarRating';
import { updatePartnerUserMeetupThunk } from '../../../actions/partnerActions';
import { getUserMeetupDataThunked } from '../../../actions/userMeetupActions';
import PropTypes from 'prop-types';
import { getMeetupSelectedTopic } from '../../../actions/meetupActions';

export class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiencyRating: 0,
      topicId: '',
      topidName: '',
    };
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.updateUserMeetup(this.props.user.authUser.id);
  }

  // componentDidUpdate(prevP`rops) {
  //   // eslint-disable-next-line react/prop-types
  //   const theKeys =
  //     (this.props.singleMeetupTopic &&
  //       Object.keys(this.props.singleMeetupTopic)) ||
  //     [];
  //   if (this.props.userMeetup && theKeys.length === 0) {
  //     this.props.getMeetupSelectedTopic(this.props.userMeetup.meetupId);
  //   }
  //   if (
  //     JSON.stringify(prevProps.singleMeetupTopic) !==
  //     JSON.stringify(this.props.singleMeetupTopic)
  //   ) {
  //     this.setState({
  //       topicName: this.props.singleMeetupTopic.topics[0].title,
  //     });
  //   }
  // }

  handleStarClick(e, topicId) {
    const rating = e.target.getAttribute('value');
    this.setState({
      proficiencyRating: rating,
      topicId: topicId,
    });
  }

  async handleSubmit() {
    await this.props.updatePartnerUserMeetup(
      this.props.user.authUser.id,
      this.props.userMeetup.meetupId,
      {
        proficiencyRating: this.state.proficiencyRating,
        userStatus: 'completed',
      },
      //status becomes userStatus because of route /api/users/:userId/meetups/:meetupId
    );
    //TODO: clear and get new usermeetup of store
    await this.props.updateUserMeetup(this.props.user.authUser.id),
      (window.location = '#/profile');
  }

  render() {
    console.log('Review form props', this.props);
    console.log('Review form state', this.state);

    return (
      <div>
        <Title
          largeText="Review Your Partner"
          smallText="Before matching with new partner, please take a moment to rate the proficiency level of your previous partner."
        />
        <div className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child"></div>
               
                
                <div
                  className="tile is-child is-6 box tileColor"
                  style={{ borderRadius: '0px' }}
                >
                  <strong>
                    {`Please rate ${this.props.partner.firstName}'s proficiency in the folowing topic:`}
                  </strong>
                  <br />
                  <br />
                  <div className="level">
                    <p>
                      {this.props.singleTopic.length > 1
                        ? this.props.singleTopic[0].title
                        : this.props.singleTopic.title}
                    </p>
                    
                    <div className='column' style={{ textAlign: 'center' }}>

                    {/* <div className="level" > */}
                    <div style={{paddingBottom:"20px"}}>
                  
                        <StarRating
                          // pass in topicId here, it will get sent back to this state with score when user clicks on star
                          topic={'topic id gets passed in here'}
                          handleStarClick={this.handleStarClick}
                        />

                       
                     
                    {/* </div> */}
                    </div>
                    
                    
                    <div
                      className="buttons"
                      style={{ justifyContent: 'center' }}
                    >
                      <button onClick={this.handleSubmit} className="button">
                        Submit
                      </button>
                    </div>
                    </div>
                  </div>
                  <div className="tile is-child"></div>
                </div>
                <div className="tile is-child"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  user: PropTypes.object,
  userMeetup: PropTypes.object,
  partner: PropTypes.object,
  pairedUserMeetups: PropTypes.object,
  updatePartnerUserMeetup: PropTypes.func,
  updateUserMeetup: PropTypes.func,
  getMeetupSelectedTopic: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth,
  userMeetup: state.userMeetup,
  partner: state.partner,
  pairedUserMeetups: state.pairedUserMeetups,
  singleTopic: state.topics.singleTopic,
  singleMeetupTopic: state.meetups.singleMeetupTopic,
});

const mapDispatchToProps = dispatch => ({
  updatePartnerUserMeetup: (userId, meetupId, data) =>
    dispatch(updatePartnerUserMeetupThunk(userId, meetupId, data)),
  updateUserMeetup: userId => dispatch(getUserMeetupDataThunked(userId)),
  getMeetupSelectedTopic: meetupId =>
    dispatch(getMeetupSelectedTopic(meetupId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Review);
