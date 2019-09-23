//COMPONET: meetup-room
//TODO After submitting a meetuprequest, navigate to meetup-page
//match, (i.e., response from createUserSessionThunk in userSessionActions.js will be set
//as either the UsersSession instance or paired UserMeetups info as {reqUser: , partner:} in store as userSession,
//In store, userSession:
//show partner info and render chatbox
//install button to close chat and "finish" meetup
//render review page for partner

import React from 'react';
import Chatroom from '../reusables/Chatroom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MeetupRoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //collect either usermeetup data OR usersession data
  }

  render() {
    console.log('MEETUP-ROOM', this.props);

    return (
      <div>
        {this.props.pairedUserMeetups.partner ? (
          <div>
            Your partners info: {this.props.pairedUserMeetups.partner.userId}
            <div>
              You are now connected:
              <Chatroom />
            </div>
          </div>
        ) : (
          'No partner was found. Please try again later or wait for next available partner.'
        )}
      </div>
    );
  }
}

MeetupRoom.propTypes = {
  userSesion: PropTypes.object,
  pairedUserMeetups: PropTypes.object,
};

const mapStateToProps = state => ({
  userSession: state.userSession, //if not paired
  pairedUserMeetups: state.pairedUserMeetups, //if paired
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetupRoom);
