const User = require('./User');
const Course = require('./Course');
const Topic = require('./Topic');
const CourseTopic = require('./CourseTopic');
const UserTopic = require('./UserTopic');
const Meetup = require('./Meetup');
const UserMeetup = require('./UserMeetup');

//Associations
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

//UserTopic associations
User.belongsToMany(Topic, {
  through: UserTopic,
  as: 'user',
  foreignKey: 'userId',
  otherKey: 'topicId',
});

Topic.belongsToMany(User, {
  through: UserTopic,
  as: 'topic',
  foreignKey: 'topicId',
  otherKey: 'userId',
});

//UserMeetup associations
User.belongsToMany(Meetup, {
  through: UserMeetup,
  foreignKey: 'userId',
  otherKey: 'MeetupId',
});

Meetup.belongsToMany(User, {
  through: UserMeetup,
  foreignKey: 'meetupId',
  otherKey: 'userId',
});

module.exports = {
  User,
  Topic,
  UserTopic,
  Course,
  CourseTopic,
  Meetup,
  UserMeetup,
};
