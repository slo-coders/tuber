const db = require('../db');
const Sequelize = require('sequelize');

const Course = db.define('course', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  courseName: {
    type: db.Sequelize.STRING,
  },

  courseCode: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  syllabusBody: {
    type: db.Sequelize.TEXT,
  },
});

module.exports = Course;
