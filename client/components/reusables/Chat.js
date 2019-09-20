import React from 'react';
import { connect } from 'react-redux';
//socket suff will be moved to the char component

import io from 'socket.io-client';
const socket = io('http://localhost:3001');

console.log('SOCKET', socket);

//needs to be put on a form on the front end.
//data is what is returned from the server
socket.on('return-message', data => {
  console.log(data); //"Hellow world"
  socket.emit('send-chat-message', message);
});

//tehre needs to be different event handelers for different events
socket.on('user-connected', data => {
  console.log(data); //"Hellow world"
  // socket.emit(//DO SOMETHING);
});

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }
  render() {
    return (
      <div>
        <form>
          <input type="text" value={this.state} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(Chat);
