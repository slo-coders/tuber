const db = require('../db');

//Table to join Topics and Courses in a dual-directional many-to-many relationship
const CourseTopic = db.define('coursetopic',
  {
    id: {
      type: db.Sequelize.UUID,
      defualtValue: db.Sequelize.UUIDV4,
      primaryKey: true
    }
  }
);

module.exports = CourseTopic;
