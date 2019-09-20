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

import { RECEIVED_MESSAGE } from '../actions/actionTypes';

const initialState = {
  messages: [],
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages.action.payload] };
    default:
      return state;
  }
};

export default socketReducer;
