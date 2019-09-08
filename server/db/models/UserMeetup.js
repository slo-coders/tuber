const db = require('../db');
const Sequelize = require('sequelize');

const UserMeetup = db.define('user-meetup', {
  id: {
    primarayKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },

  userType: {
    type: Sequelize.ENUM,
    values: ['Mentor', 'Mentee', 'Peer'],
  },

  softSkillsRating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 500,
      min: 0,
    },
  },

  proficiencyRating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 500,
      min: 0,
    },
  },

  comments: {
    type: Sequelize.TEXT,
  },
});

module.exports = UserMeetup;
