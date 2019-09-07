const db = require('./db');
const { User, Course, Topic, CourseTopic } = require('./models/index');

module.exports = { db, User, Course, Topic, CourseTopic };
