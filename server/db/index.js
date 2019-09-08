const db = require('./db');
const { User, Course, UserMeetup } = require('./models/index');

module.exports = { db, User, Course, UserMeetup };
