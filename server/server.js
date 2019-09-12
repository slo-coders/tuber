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

app.use('/api/sessions', require('./routes/sessions'));

//PAYWALL --> THIS WILL PROBABLY BE MOVED AROUND
// if (process.env.NODE_ENV !== 'test') {
//   app.use(async (req, res, next) => {
//     try {
//       if (req.session && req.session.userId) {
//         const sessionUser = await User.findOne({
//           where: {
//             id: req.session.userId,
//           },
//         });
//         if (!sessionUser) {
//           console.log('Please try again');
//         }
//         next();
//       } else {
//         res.sendStatus(401);
//         next();
//       }
//     } catch (err) {
//       next(err);
//     }
//   });
// }

app.use('/api', routes);

app.use('/', express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
