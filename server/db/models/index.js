const User = require('./User');
const Topic = require('./Topic');
const Course = require('./Course');
const CourseTopic = require('./CourseTopic');
// const UserMeetup = require('./UserMeetup');
const Meetup = require('./Meetup');

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
// User.belongsToMany(Meetup, {
//   through: UserMeetup,
//   foreignKey: 'userId',
//   otherKey: 'MeetupId',
// });

// Meetup.belongsToMany(User, {
//   through: UserMeetup,
//   foreignKey: 'MeetupId',
//   otherKey: 'UserId',
// });

module.exports = {
  User,
  Topic,
  Course,
  CourseTopic,
  Meetup,
  // UserMeetup,
};
