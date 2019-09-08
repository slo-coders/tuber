const db = require('./db');
const { User, Course, Topic, CourseTopic, Meetup } = require('./models/index');

module.exports = { db, User, Course, Topic, CourseTopic, Meetup };
