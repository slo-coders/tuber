const express = require('express');
const path = require('path');
const routes = require('./routes/APIs');
const morgan = require('morgan');
const { db } = require('./db/index');
const session = require('express-session');
const createSequelizeStore = require('connect-session-sequelize');
const SequelizeStore = createSequelizeStore(session.Store);
const app = express();

require('dotenv').config();

//sockets are listening on 3001, need to fix this later
const io = require('socket.io')(3001);
// const server = require('http').createServer(app);
// const io = socketIO(server);

app.use(morgan('dev'));

//will give each user a new socket
//all socket logic will go in this function
//Note, socket has a unique id (socket.id) that can be used to differentiate users

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Pass the salt and sanctuary',
    cookie: { maxAge: 3 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    name: 'SID',
    store: new SequelizeStore({
      db,
      table: 'session',
      extendDefaultFields: (defaults, session) => ({
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId,
      }),
    }),
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/api/sessions', require('./routes/sessions'));

io.on('connection', socket => {
  console.log('User Socket made: ', socket.id);

  // //will listen for input from the client for instance of 'chat-message'
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('room', data => {
    //verify meetup connection/meetupId
    socket.join(data.room);
    console.log('in room creator:', data.room);
  });

  socket.on('leave-room', data => {
    console.log('chat-room closed');
    socket.leave(data.room);
  });

  socket.on('chat-message', function(data) {
    console.log('message from client', data);
    //ISSUE - data coming in from client, but not getting sent back to the room. not subscribed?
    io.in(data.room).emit('message-data', data);
    // io.emit('message-data', data);
  });
  // socket.on('message', data => {
  //   console.log('message from client:', data);
  //   //send to client with 'chat-message'tag
  //   io.emit('chat-message', data);
  //   //will send message to everyone on server except for the sender
  //   //Will want to make this more specific for user and partner. possibly need to set up a room
  //   // socket.broadcast.emit('chat-message', message);
  // });
});

app.use('/api', routes);

module.exports = { app, io };
