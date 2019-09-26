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

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(morgan('dev'));

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

io.on('connection', socket => {
  console.log('User Socket made: ', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('room', data => {
    // if(data.status === 'matched'){
      socket.join(data.room);
      console.log('in room creator:', data.room);
      // console.log('SOCKET OBJ', socket);
    // }
  });

  socket.on('leave-room', data => {
    console.log('leaving chat room');
    socket.leave(data.room);     
  });

  let halfstackResponse =
    'Hey! You probably want to talk to another human. Try chosing a topic and finding a partner!';

  const dataFail = { user: 'Half-Stack', text: halfstackResponse };

  socket.on('chat-message', function(data) {
    if (data.room === null) {
      io.to(`${socket.id}`).emit('message-data', dataFail);
    }
    io.in(data.room).emit('message-data', data);
  });
});
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api', routes);

module.exports = { http, io };
