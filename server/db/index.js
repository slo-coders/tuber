const db = require('./db');
const { User, Course, Meetup, UserMeetup } = require('./models/index');

module.exports = { db, User, Course, Meetup, UserMeetup };
