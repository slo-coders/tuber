const db = require('../db');
const Sequelize = require('sequelize');

const Meetup = db.define('meetup', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  meetupType: {
    type: Sequelize.ENUM,
    values: ['M:M', 'P:P'],
  },
  location: {
    type: Sequelize.STRING,
  },
  matchedAt: {
    type: Sequelize.DATE,
  },
  meetupEnded: {
    type: Sequelize.DATE,
  },
  meetupConfirmed: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Meetup;
