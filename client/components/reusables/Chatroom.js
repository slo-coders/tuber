/* eslint-disable react/prop-types */
import React from 'react';
import uuid from '../../../server/db/utils/uuid';
import { connect } from 'react-redux';
import { getUserMeetupDataThunked } from '../../actions/userMeetupActions';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: uuid(),
      messageList: [],
      message: '',
    };
    this.onHandle = this.onHandle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateMessages = this.updateMessages.bind(this);

    //listening for incomming server data
    socket.on('message-data', data => {
      console.log('Info from SERVER: ', data);
      this.updateMessages(data);
    });
  }

  //need to get meetupId
  componentDidMount() {
    this.props.getUserMeetupDataThunked(this.props.user.authUser.id);
  }

  // else {
  //   socket.emit('room', {
  //     room: this.props.userMeetup.userMeetup[0].id,
  //   });
  // }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.authUser &&
      this.props.user.authUser &&
      prevProps.user.authUser.id !== this.props.user.authUser.id
    ) {
      this.props.getUserMeetupDataThunked(this.props.user.authUser.id);
    }
    if (
      prevProps.userMeetup &&
      this.props.userMeetup &&
      prevProps.userMeetup.id !== this.props.userMeetup.id
    ) {
      socket.emit('room', {
        room: this.props.userMeetup.id,
      });
    }
  }

  componentWillUnmount() {
    socket.emit('leave-room', {
      room: this.props.userMeetup.id,
    });
  }

  onHandle(ev) {
    this.setState({ message: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    socket.emit('chat-message', {
      room: this.props.userMeetup.id,
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

  render() {
    if (this.props.user.authUser.id === undefined) return null;
    return (
      <div>
        <div>
          <h3>Welcome! The topic of discussion is:</h3>
        </div>

        <div className="message-list">
          {this.state.messageList.map((item, idx) => (
            <li
              className="messages"
              key={idx}
            >{`${item.user}: ${item.text}`}</li>
          ))}
        </div>

        <form classNames="chatForm" onSubmit={this.onSubmit}>
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  userMeetup: state.userMeetup.mostRecentUserMeetup,
});
const mapDispatchToProps = dispatch => ({
  getUserMeetupDataThunked: userid =>
    dispatch(getUserMeetupDataThunked(userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
