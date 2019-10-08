const express = require('express');
const path = require('path');
const routes = require('./routes/APIs');
const morgan = require('morgan');
const { db } = require('./db/index');
const session = require('express-session');
const createSequelizeStore = require('connect-session-sequelize');
const SequelizeStore = createSequelizeStore(session.Store);
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('dotenv').config();

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
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('room', data => {
    socket.join(data.room);
    console.log('Room created:', data.room);
  });

  socket.on('leave-room', data => {
    console.log('leaving chat room');
    socket.leave(data.room);
  });

  let halfstackResponse =
    'Hey! You probably want to talk to another human. Try chosing a topic and finding a partner!';

  const dataFail = { user: 'Half-Stack', text: halfstackResponse };

  socket.on('chat-message', function (data) {
    if (data.room === null) {
      io.to(`${socket.id}`).emit('message-data', dataFail);
    }
    io.in(data.room).emit('message-data', data);
  });
});
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api', routes);

module.exports = { app, http, io };
