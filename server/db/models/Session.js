const db = require('../db');
const Sequelize = require('sequelize');

const Session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.STRING(5000),
});

module.exports = Session;
