const db = require('../db');

const Course = db.define('course', {
  id: {
    type: db.Sequelize.UUID,
    defaultValues: db.Sequelize.UUID,
    primaryKey: true
  },

  courseName: {
    type: db.Sequelize.STRING
  },

  courseCode: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  syllabusBody: {
    type: db.Sequelize.TEXT
  }
});

module.exports = Course;
