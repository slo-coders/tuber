const db = require('../db');
const Sequelize = require('sequelize');

const UserTopic = db.define('meetup', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  proficiencyRating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 500,
      min: 0,
    },
  },
});

module.exports = UserTopic;
