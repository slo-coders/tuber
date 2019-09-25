/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { getUserMeetupDataThunked } from '../../actions/userMeetupActions';
import { updateMeetupDataThunked } from '../../actions/userMeetupActions';

import io from 'socket.io-client';
const socket = io();

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.closeMeetup = this.closeMeetup.bind(this);

    //listening for incomming server data
    socket.on('message-data', data => {
      console.log('Info from SERVER: ', data);
      this.updateMessages(data);
    });
  }

  componentDidMount() {
    socket.emit('room', {
      room: this.props.meetupId,
    });
    if (!this.props.partner && this.props.pairedUserMeetups) {
      this.props.singlePartnerThunk(
        this.props.pairedUserMeetups.partner.userId,
      );
    }
  }

  componentDidUpdate(prevProps) {
    const prevMeetupId =
      prevProps.pairedUserMeetups.partner &&
      prevProps.pairedUserMeetups.partner.meetupId;
    const currentMeetupId =
      this.props.pairedUserMeetups.partner &&
      this.props.pairedUserMeetups.partner.meetupId;
    if (prevMeetupId !== currentMeetupId) {
      socket.emit('leave-room', {
        room: prevProps.meetupId,
      });
      socket.emit('room', {
        room: this.props.meetupId,
      });
    }
  }

  onHandle(ev) {
    this.setState({ message: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    socket.emit('chat-message', {
      room: this.props.meetupId,
      user: this.props.user.authUser.firstName,
      text: this.state.message,
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
    });

    //TODO: In Review component, add put/update partner's profeciencyRating and change UserMeetup status from 'pending review' to 'completed'

    this.props.updateMeetupDataThunked(
      this.props.user.authUser.id,
      this.props.meetupId,
      { status: 'pending review' },
    );
    window.location = '/'; //navigate to review component or to home
  }

  render() {
    if (this.props.user.authUser.id === undefined) return null;
    console.log('CHAT-ROOM PROPS', this.props);
    return (
      <div>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-parent is-4">
              <div
                className="tile is-child box tileColor"
                style={{ textAlign: 'center', borderRadius: "0px" }}
              >
                <div>
                  <div>
                    <h5>
                      {"Your partner's name is: " +
                        this.props.partner.firstName}
                    </h5>
                    <h3>The topic of discussion is: {}</h3>
                    <br />
                    <img
                      className="partnerImg"
                      src={this.props.partner.imageUrl}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child box tileColor" style={{borderRadius: "0px"}}>
                <div className="message-list" style={{overflowY: 'scroll',
height: '200px'}}>
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
                    onChange={this.onHandle}
                    value={this.state.message}
                  />
                  <button className="button" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <a className="button" onClick={this.closeMeetup}>Close MeetupRoom</a>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  // userMeetup: state.userMeetup,
  meetupId: state.pairedUserMeetups.reqUser
    ? state.pairedUserMeetups.reqUser.meetupId
    : null,
  partner: state.partner,
  pairedUserMeetups: state.pairedUserMeetups,
});
const mapDispatchToProps = dispatch => ({
  getUserMeetupDataThunked: userid =>
    dispatch(getUserMeetupDataThunked(userid)),
  updateMeetupDataThunked: (userId, meetupId, data) =>
    dispatch(updateMeetupDataThunked(userId, meetupId, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
