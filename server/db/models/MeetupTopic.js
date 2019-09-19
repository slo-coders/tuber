const db = require('../db');
const Sequelize = require('sequelize');

const MeetupTopic = db.define('meetup_topic', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
});

module.exports = MeetupTopic;
