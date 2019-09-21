/* eslint-disable react/prop-types */
import React from 'react';
import uuid from '../../../server/db/utils/uuid';
import { connect } from 'react-redux';
import { getUserMeetupDataThunked } from '../../actions/userMeetupActions';

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

class Chatroom extends React.Component {
  constructor() {
    super();
    this.state = {
      id: uuid(),
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
  componentDidMount() {
    socket.emit('room', {
      room: 'main-room',
    });
    console.log('componentDidMount: room');
  }

  componentWillUnmount() {
    socket.emit('leave-room', {
      room: 'main-room',
    });
  }

  onHandle(ev) {
    this.setState({ message: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();
    socket.emit('chat-message', {
      room: 'main-room',
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
    console.log('CHAT ROOM', this.props);
    return (
      <div>
        <div>
          <h3>Welcome! The topic of discussion is:</h3>
        </div>

        <div className="message-list">
          {this.state.messageList.map((item, idx) => (
            <li key={idx}>{`${item.user}: ${item.text}`}</li>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  userMeetup: state.userMeetup,
});
const mapDispatchToProps = dispatch => ({
  getUserMeetupDataThunked: userid =>
    dispatch(getUserMeetupDataThunked(userid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
