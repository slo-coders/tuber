const db = require('./db');

const {
  User,
  Course,
  Topic,
  CourseTopic,
  UserMeetup,
  Meetup,
  Session,
} = require('./models/index');

module.exports = {
  db,
  User,
  Course,
  Topic,
  UserMeetup,
  CourseTopic,
  Meetup,
  Session,
};
