const express = require('express');
const path = require('path');
const routes = require('./routes/APIs');
// const morgan = require('morgan');
const { db } = require('./db/index');
const session = require('express-session');
const createSequelizeStore = require('connect-session-sequelize');
const SequelizeStore = createSequelizeStore(session.Store);
const app = express();
require('dotenv').config();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// app.use(morgan('dev'));

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
    socket.join(data.room);
    console.log('in room creator:', data.room);
  });

  socket.on('leave-room', data => {
    console.log('chat-room closed');
    socket.leave(data.room);
  });

  socket.on('chat-message', function(data) {
    console.log('message from client', data);
    io.in(data.room).emit('message-data', data);
  });
});
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api', routes);

module.exports = { http, io };
