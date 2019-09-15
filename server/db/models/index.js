const User = require('./User');
const Course = require('./Course');
const Topic = require('./Topic');
const CourseTopic = require('./CourseTopic');
const UserTopic = require('./UserTopic');
const Meetup = require('./Meetup');
const UserMeetup = require('./UserMeetup');
const Session = require('./Session');
const UserSession = require('./UserSession');
const MeetupTopic = require('./MeetupTopic');

//Associations

//MeetupTopic associations

Meetup.belongsToMany(Topic, {
  through: 'meetup_topic',
  foreignKey: 'meetupId',
  otherKey: 'topicId',
});

// CourseTopic associations
Course.belongsToMany(Topic, {
  through: 'course_topic',
  foreignKey: 'courseId',
  otherKey: 'topicId',
});

Topic.belongsToMany(Course, {
  through: 'course_topic',
  foreignKey: 'topicId',
  otherKey: 'courseId',
});

//UserTopic associations
User.belongsToMany(Topic, {
  through: UserTopic,
  foreignKey: 'userId',
  otherKey: 'topicId',
});

Topic.belongsToMany(User, {
  through: UserTopic,
  foreignKey: 'topicId',
  otherKey: 'userId',
});

//UserMeetup associations
User.belongsToMany(Meetup, {
  through: UserMeetup,
  foreignKey: 'userId',
  otherKey: 'meetupId',
});

Meetup.belongsToMany(User, {
  through: UserMeetup,
  foreignKey: 'meetupId',
  otherKey: 'userId',
});

//UserSession associations
Session.belongsToMany(User, {
  through: UserSession,
  foreignKey: 'sid',
  otherKey: 'userId',
});

User.belongsToMany(Session, {
  through: UserSession,
  foreignKey: 'userId',
  otherKey: 'sid',
});

module.exports = {
  User,
  Topic,
  UserTopic,
  Course,
  CourseTopic,
  Meetup,
  UserMeetup,
  Session,
  UserSession,
  MeetupTopic,
};
