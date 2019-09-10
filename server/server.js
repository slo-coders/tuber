const express = require('express');
const path = require('path');

const { db } = require('../server/db/index');
const session = require('express-session');
const createSequelizeStore = require('connect-session-sequelize');
const SequelizeStore = createSequelizeStore(session.Store);

require('dotenv').config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Salt and Sanctuary',
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

// app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api', require('./routes/index'));

module.exports = app;
