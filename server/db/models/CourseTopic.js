const db = require('../db');
const Course = require('./Course');
const Topic = require('./Topic');

//Table to join Topics and Courses in a dual-directional many-to-many relationship
const CourseTopic = db.define('coursetopic', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true,
  },
});

CourseTopic.associate = async function(courseCode, topicTitle) {
  let courseToConnect = await Course.findOne({
    where: { courseCode: courseCode },
  });
  let topicToConnect = await Topic.findOne({
    where: { title: topicTitle },
  });
  return await CourseTopic.create({
    topicId: topicToConnect.id,
    courseid: courseToConnect.id,
  });
};

module.exports = CourseTopic;
