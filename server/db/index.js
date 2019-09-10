const db = require('./db');

// const {
//   User,
//   Course,
//   CourseTopic,
//   Topic,
//   UserTopic,
//   Meetup,
//   UserMeetup,
// } = require('./models/index');

// module.exports = { db, User, Course, CourseTopic, Topic, UserTopic, Meetup, UserMeetup };
module.exports = { ...require('./models/index'), db };
