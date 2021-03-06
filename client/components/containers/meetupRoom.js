/* eslint-disable react/prop-types */
//COMPONET: meetup-room
//TODO After submitting a meetuprequest, navigate to meetup-page
//match, (i.e., response from createUserSessionThunk in userSessionActions.js will be set
//as either the UsersSession instance or paired UserMeetups info as {reqUser: , partner:} in store as userSession,
//In store, userSession:
//show partner info and render chatbox
//install button to close chat and "finish" meetup
//render review page for partner

//General: List the topic for the room
//Get all partner info: firstname, profiency, image.... (User + UserTopic + Topic)

import React from 'react';
import Chatroom from '../reusables/Chatroom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Title from '../reusables/Title';
import { singlePartnerThunk } from '../../actions/partnerActions';
import {
  singleMeetupThunk,
  getMeetupSelectedTopic,
} from '../../actions/meetupActions';
import { singleTopicThunk } from '../../actions/topicActions';
import { closeUserSession } from '../../actions/userSessionActions';

class MeetupRoom extends React.Component {
  constructor(props) {
    super(props);
    // this.redirectToHome = this.redirectToHome.bind(this);
    this.cancelRequest = this.cancelRequest.bind(this);
  }

  async componentDidMount() {
    const currentPairedPartner =
      this.props.pairedUserMeetups && this.props.pairedUserMeetups.partner;
    const currentMeetupId =
      this.props.userMeetup && this.props.userMeetup.meetupId;
    const currentMeetupStatus =
      this.props.userMeetup && this.props.userMeetup.status;
    if (this.props.pairedUserMeetups && this.props.pairedUserMeetups.partner) {
      // console.log('firing from if, inside componentDidMount top');
      await this.props.singlePartnerThunk(
        this.props.pairedUserMeetups.partner.userId,
      );
    }
    if (
      currentMeetupId &&
      currentMeetupStatus === 'matched' &&
      !currentPairedPartner
    ) {
      // console.log('firing from inside componentDidMount, second-if');
      await this.props.getMeetupWithExtra(currentMeetupId); //sets `meetups.singleMeetups` in the store
    }

    //fetches the single topic for the overall meetup
    this.props.getMeetupSelectedTopic(this.props.userMeetup.meetupId);
  }

  async componentDidUpdate(prevProps) {
    const prevPartnerId =
      prevProps.pairedUserMeetups.partner &&
      prevProps.pairedUserMeetups.partner.userId;
    const currentPartnerId =
      this.props.pairedUserMeetups.partner &&
      this.props.pairedUserMeetups.partner.userId;
    const currentPairedPartner =
      this.props.pairedUserMeetups && this.props.pairedUserMeetups.partner;
    const currentMeetupId =
      this.props.userMeetup && this.props.userMeetup.meetupId;
    const currentMeetupStatus =
      this.props.userMeetup && this.props.userMeetup.status;
    const prevMeetupUsersArr =
      prevProps.meetupObjWithUsersArr && prevProps.meetupObjWithUsersArr.users;
    // const currentMeetupUsersArr = this.props.meetupObjWithUsersArr && this.props.meetupObjWithUsersArr.users;

    if (this.props.userMeetup.topicId) {
      ////////////changed
      this.props.singleTopicThunk(this.props.userMeetup.topicId);
    }

    if (
      prevPartnerId !== currentPartnerId &&
      this.props.pairedUserMeetups.partner
    ) {
      // console.log('firing from inside componentDidUpdate (if)');
      this.props.singlePartnerThunk(
        this.props.pairedUserMeetups.partner.userId,
      );
    } else if (
      currentMeetupId &&
      currentMeetupStatus === 'matched' &&
      !currentPairedPartner &&
      !prevMeetupUsersArr //(prevMeetupUsersArr !== currentMeetupUsersArr)// && !prevMeetupUsersArr
    ) {
      /* console.log(
        'firing from inside componentDidUpdate, else-if',
        currentMeetupId,
      ); */
      await this.props.getMeetupWithExtra(currentMeetupId); //sets meetups.singleMeetups in the store by using an independent GET call
    }
  }

  cancelRequest() {
    this.props.closeUserSession(this.props.user.id);
    window.location = '/#/profile';
  }

  render() {
    // console.log('MEETUP-ROOM-PROPS', this.props);
    if (!this.props.meetupObjWithUsersArr) return null;

    let partner;
    let meetupTopic;

    if (
      this.props.meetupObjWithUsersArr &&
      this.props.meetupObjWithUsersArr.users &&
      this.props.meetupObjWithUsersArr.users.length > 0
    ) {
      const [user1, user2] = this.props.meetupObjWithUsersArr.users;
      meetupTopic = this.props.meetupObjWithUsersArr.topics[0].title;

      // console.log('user1 and user2', user1, user2);

      if (user1.id !== this.props.user.id) {
        partner = user1;
      } else if (user1.id === this.props.user.id) {
        partner = user2;
      } else {
        console.err(
          "No users were found in the store's meetupObjWithUsersArr; response saved by the meetupAction",
        );
      }

      // console.log('MeetupRoom partner from render: ', partner);
    }
    console.log('MEETUP ROOM', this.props);

    //Get meetup topics ID --> userSession.singleUserSessionInfo.selectedTopics[0]

    //could also get information off of the courses property on state: --> courses.singleCourseWithTopics

    let topicId;

    if (
      this.props.userSession.singleUserSessionInfo &&
      this.props.userSession.singleUserSessionInfo.selectedTopics
    ) {
      topicId = this.props.userSession.singleUserSessionInfo.selectedTopics[0];
    }

    let mentorTopic;
    if (
      this.props.userMeetup.userType === 'mentor' &&
      this.props.courses.singleCourseWithTopics.length > 1
    ) {
      console.log(
        'meetupRoom courses',
        this.props.courses.singleUserSessionInfo,
      );
    }

    console.log('meetuproom state courses', this.props.courses);

    return (
      <div>
        {this.props.pairedUserMeetups.partner || (partner && meetupTopic) ? (
          <div>
            <Title
              smallText="Chat with your partner to decide on meeting details. Always keep it respectful."
              largeText="You have been matched!"
            />
            <div className="section">
              <div className="container">
                <Chatroom
                  mentorTopic={mentorTopic}
                  meetupTopic={meetupTopic}
                  partnerAlt={partner}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={this.cancelRequest}>Cancel Request</button>
            <Title
              style={{ paddingTop: '80px' }}
              smallText="Please wait for the next available partner."
              largeText="Meetup Pending"
            />
          </div>
        )}
      </div>
    );
  }
}

MeetupRoom.propTypes = {
  user: PropTypes.object,
  userSesion: PropTypes.object,
  pairedUserMeetups: PropTypes.object,
  partner: PropTypes.object,
  userMeetup: PropTypes.object,
  meetupObjWithUsersArr: PropTypes.object,
  singlePartnerThunk: PropTypes.func,
  getMeetupWithExtra: PropTypes.func,
  singleTopicThunk: PropTypes.func,
  closeUserSession: PropTypes.func,
  getMeetupSelectedTopic: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth.authUser,
  userSession: state.userSession, //if not paired
  pairedUserMeetups: state.pairedUserMeetups, //if paired
  partner: state.partner,
  userMeetup: state.userMeetup,
  meetupObjWithUsersArr: state.meetups.singleMeetup,
  singleTopic: state.topics.singleTopic,
  courses: state.courses,
});

const mapDispatchToProps = dispatch => ({
  closeUserSession: userId => dispatch(closeUserSession(userId)),
  singlePartnerThunk: partnerId => dispatch(singlePartnerThunk(partnerId)), //gets User instance for partner, given partner's userId
  getMeetupWithExtra: meetupId => dispatch(singleMeetupThunk(meetupId)),
  singleTopicThunk: topicId => dispatch(singleTopicThunk(topicId)),
  getMeetupSelectedTopic: meetupId =>
    dispatch(getMeetupSelectedTopic(meetupId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupRoom);
