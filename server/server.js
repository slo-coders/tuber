const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const { db } = require('./db/index');
const session = require('express-session');
const createSequelizeStore = require('connect-session-sequelize');
const SequelizeStore = createSequelizeStore(session.Store);

require('dotenv').config();

const app = express();

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

module.exports = app;
