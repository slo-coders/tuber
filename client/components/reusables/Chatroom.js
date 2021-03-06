/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getUserMeetupDataThunked,
  updateMeetupDataThunked,
} from '../../actions/userMeetupActions';
import { removeSingleMeetupThunk } from '../../actions/meetupActions';
import { removePairedUserMeetupsThunk } from '../../actions/meetupRoomAction';

import io from 'socket.io-client';
const socket = io();

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
      title: '',
      //need to have userMeetup status checked for update.
      //Nessissary for terminating socket room?
      status: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.closeMeetup = this.closeMeetup.bind(this);

    //listening for incoming server data
    socket.on('message-data', data => {
      this.updateMessages(data);
    });
  }

  componentDidMount() {
    socket.emit('room', {
      room: this.props.meetupId,
    });
    if (!this.props.partner && this.props.pairedUserMeetups) {
      this.props.getUserMeetup(this.props.user.authUser.id);
      this.props.singlePartnerThunk(
        this.props.pairedUserMeetups.partner.userId,
      );
    }
    this.setState({ title: this.props.singleTopic.title });
  }

  componentDidUpdate(prevProps) {
    const prevMeetupId =
      prevProps.pairedUserMeetups.partner &&
      prevProps.pairedUserMeetups.partner.meetupId;
    const currentMeetupId =
      this.props.pairedUserMeetups.partner &&
      this.props.pairedUserMeetups.partner.meetupId;

    // const currentUserMeetupStatus = this.props.pairedUserMeetups &&this.props.pairedUserMeetups.reqUser;
    // const currentPartnerMeetupStatus = this.props.pairedUserMeetups && this.props.pairedUserMeeetups.partner;
    if (prevMeetupId !== currentMeetupId) {
      socket.emit('leave-room', {
        room: prevProps.meetupId,
      });
      socket.emit('room', {
        room: this.props.meetupId,
      });
    }
  }

  handleTextChange(ev) {
    this.setState({ message: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    socket.emit('chat-message', {
      room: this.props.meetupId,
      user: this.props.user.authUser.firstName,
      text: this.state.message,
      // status: this.state.status,
    });
    this.setState({ message: '' });
  }

  updateMessages(payload) {
    this.setState(prevState => {
      return { messageList: [...prevState.messageList, payload] };
    });
  }

  closeMeetup() {
    socket.emit('leave-room', {
      room: this.props.meetupId,
      //include status on body as a check
    });
    this.props.updateMeetupData(
      this.props.user.authUser.id,
      this.props.meetupId,
      {
        userStatus: 'pending review',
        partnerStatus: 'pending review',
      },
    );
    //need to wipe meetups.singleMeetup off global state store /////////////////
    this.props.removeSingleMeetupThunk();
    this.props.removePairedUserMeetupsThunk();
    this.props.getUserMeetup(this.props.user.authUser.id);
    window.location = '/#/review'; //navigate to review component or to home
  }

  render() {
    if (this.props.user.authUser.id === undefined) return null;

    let partner;
    if (this.props.partnerAlt) partner = this.props.partnerAlt;
    else if (this.props.partner) partner = this.props.partner;

    let newTopicTitle;
    if (this.props.mentorTopic && this.props.mentorTopic[0]) {
      newTopicTitle = this.props.mentorTopic[0].title;
    }

    return (
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-parent is-4">
              <div
                className="tile is-child box tileColor"
                style={{ textAlign: 'center', borderRadius: '0px' }}
              >
                <div>
                  <div>
                    <h5>{"Your partner's name is: " + partner.firstName}</h5>
                    <h3>
                      Let&apos;s talk about:{' '}
                      {this.state.title
                        ? this.state.title
                        : this.props.meetupTopic
                        ? this.props.meetupTopic
                        : newTopicTitle}
                    </h3>
                    <br />
                    <img className="partnerImg" src={partner.imageUrl} />
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div
                className="tile is-child box tileColor"
                style={{ borderRadius: '0px' }}
              >
                <div
                  className="message-list"
                  style={{
                    overflowY: 'scroll',
                    height: '200px',
                    backgroundColor: 'white',
                  }}
                >
                  {this.state.messageList.map((item, idx) => (
                    <li
                      className="messages"
                      key={idx}
                    >{`${item.user}: ${item.text}`}</li>
                  ))}
                </div>

                <form onSubmit={this.onSubmit}>
                  <label htmlFor="chatmessage">Message</label>
                  <input
                    type="text"
                    name="chatmessage"
                    onChange={this.handleTextChange}
                    value={this.state.message}
                  />
                  <button className="button" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons" style={{ justifyContent: 'center' }}>
          <a className="button" onClick={this.closeMeetup}>
            Close MeetupRoom
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  meetupId: state.pairedUserMeetups.reqUser
    ? state.pairedUserMeetups.reqUser.meetupId
    : state.userMeetup && state.userMeetup.meetupId
    ? state.userMeetup.meetupId
    : null,
  partner: state.partner,
  pairedUserMeetups: state.pairedUserMeetups,
  singleTopic: state.topics.singleTopic,
});
const mapDispatchToProps = dispatch => ({
  getUserMeetup: userid => dispatch(getUserMeetupDataThunked(userid)),
  updateMeetupData: (userId, meetupId, data) =>
    dispatch(updateMeetupDataThunked(userId, meetupId, data)),
  removeSingleMeetupThunk: () => dispatch(removeSingleMeetupThunk()),
  removePairedUserMeetupsThunk: () => dispatch(removePairedUserMeetupsThunk()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
