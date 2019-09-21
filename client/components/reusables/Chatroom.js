/* eslint-disable react/prop-types */
import React from 'react';
import uuid from '../../../server/db/utils/uuid';
import { connect } from 'react-redux';
//socket suff will be moved to the char component

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

//should capture data from server and update state???

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

    socket.on('chat-message', data => {
      console.log('Info from SERVER: ', data); //"Hellow world"
      this.updateMessages(data);
    });
  }

  onHandle(ev) {
    this.setState({ message: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    socket.emit('chat-message', {
      user: this.props.user.authUser.firstName,
      text: this.state.message,
    });
    this.setState({ message: '' });
  }

  updateMessages(payload) {
    console.log('update fired:', payload);
    this.setState(prevState => {
      return { messageList: [...prevState.messageList, payload] };
    });
  }
  render() {
    console.log('Chat room', this.state);
    return (
      <div>
        <div>You are in the Chatroom</div>

        <div className="message-list">
          {this.state.messageList.map((item, idx) => (
            <li key={idx}>{`${item.user}: ${item.text}`}</li>
          ))}
        </div>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            onChange={this.onHandle}
            value={this.state.message}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth });

export default connect(
  mapStateToProps,
  null,
)(Chatroom);
