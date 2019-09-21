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

// app.use(morgan('dev'));

//will give each user a new socket
//all socket logic will go in this function
//Note, socket has a unique id (socket.id) that can be used to differentiate users

io.on('connection', socket => {
  console.log('User Socket made: ', socket.id);

  //will listen for input from the client for instance of 'chat-message'
  socket.on('chat-message', data => {
    console.log('message from client:', data);
    io.emit('chat-message', data);

    //will send message to everyone on server except for the sender
    //Will want to make this more specific for user and partner. possibly need to set up a room

    // socket.broadcast.emit('chat-message', message);
  });
});

//move sockets to adter sessions?

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

app.use('/api', routes);

module.exports = { app, io };
