const express = require('express');
const path = require('path');
// const session = require('express-session');
// const {db} = require('./db/index');
/* const routes = require('./routes/index');
const sessionRoutes = require('./routes/sessionRoutes');
const SequelizeStore = require('connect-session-sequelize')(session.Store); */

require('dotenv').config();

const app = express();

/*
const store = new SequelizeStore({
  db,
  table: 'session',
  extendDefaults: (defaults, _session) => {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: _session.userId,
    }
  }
})

app.use(session({
  secret: 'a;ldf;alskdf',
  resave: false,
  saveUninitialized: true,
  store
}))
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', sessionRoutes)
// app.use('/api', routes);
app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./routes/index'));

module.exports = app;