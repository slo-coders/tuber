const User = require('./User');
const Topic = require('./Topic');
const Course = require('./Course');
const CourseTopic = require('./CourseTopic');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

// CourseTopic associations
Course.belongsToMany(Topic, {
  through: 'coursetopic',
  as: 'course',
  foreignKey: 'courseId',
  otherKey: 'topicId',
});
Topic.belongsToMany(Course, {
  through: 'coursetopic',
  as: 'topic',
  foreignKey: 'topicId',
  otherKey: 'courseId',
});

module.exports = {
  User,
  Topic,
  Course,
  CourseTopic,
};
