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
import { singlePartnerThunk } from '../../actions/partnerActions';
import Title from '../reusables/Title';

class MeetupRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //collect either usermeetup data OR usersession data
    //loads in the partners user information
    if (this.props.pairedUserMeetups.partner) {
      this.props.singlePartnerThunk(
        this.props.pairedUserMeetups.partner.userId,
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.pairedUserMeetups.partner ||
      this.props.partner === undefined ||
      prevProps.pairedUserMeetups.partner.userId !==
        this.props.pairedUserMeetups.partner.userId
    ) {
      this.props.singlePartnerThunk(
        this.props.pairedUserMeetups.partner.userId,
      );
    }
  }

  render() {
    console.log('MEETUP-ROOM', this.props);

    return (
      <div>
        {this.props.pairedUserMeetups.partner ? (
          <div>
            <Title
              smallText="Lorem ipsum dolor sit amet, pri quod inimicus disputando cu, sit
                  facilisi abhorreant in."
              largeText="You have been matched!"
            />

            <div className="section">
              <div className="container">
                <Chatroom />
              </div>
            </div>
          </div>
        ) : (
          <Title
            style={{ paddingTop: '80px' }}
            smallText="No partner was found. Please try again later or wait for next available partner."
            largeText="Meetup Not Successful"
          />
        )}
      </div>
    );
  }
}

MeetupRoom.propTypes = {
  userSesion: PropTypes.object,
  pairedUserMeetups: PropTypes.object,
  singlePartnerThunk: PropTypes.func,
  partner: PropTypes.object,
};

const mapStateToProps = state => ({
  userSession: state.userSession, //if not paired
  pairedUserMeetups: state.pairedUserMeetups, //if paired
  partner: state.partner,
});

const mapDispatchToProps = dispatch => ({
  singlePartnerThunk: partnerId => dispatch(singlePartnerThunk(partnerId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupRoom);
