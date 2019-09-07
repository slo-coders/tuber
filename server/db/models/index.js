const User = require('./User');
const Topic = require('./Topic');
const Course = require('./Course');
const CourseTopic = require('./CourseTopic');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

Course.associate = function(Topic) {
  Course.belongsToMany(Topic, {
    through: 'CourseTopic',
    as: 'course',
    foreignKey: 'courseId',
    otherKey: 'topicId'
  });
};
Topic.associate = function(Course) {
  Topic.belongsToMany(Course, {
    through: 'CourseTopic',
    as: 'topic',
    foreignKey: 'topicId',
    otherKey: 'courseId'
  });
};

// CourseTopic.create({
//   topicId: 'c064bb65-0101-418e-9754-9a1450782d3b',
//   courseId: '4d3143f1-d6a7-49af-bb93-258a692db25f'
// });

module.exports = {
  User,
  Topic,
  Course,
  CourseTopic
};
