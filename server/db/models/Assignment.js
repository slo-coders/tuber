const db = require('../db');

// Model Definition
const Assignment = db.define('assignment',
    {
      title: {
        type: db.Sequelize.STRING
      },
      description: {
        type: db.Sequelize.TEXT,
        allowNull: false
      },
      dueDateRequired: {
        type: db.Sequelize.BOOLEAN
      },
      dueAt: {
        type: db.Sequelize.DATE
      },
      htmlURL: {
        type: db.Sequelize.STRING
    }
});

//ASSOCIATIONS
/*
Course.hasMany(Topic);
Topic.hasMany(Course);
*/

module.exports = Assignment;
