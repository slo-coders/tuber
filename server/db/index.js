const db = require('./db');
const { User, Course, Topic } = require('./models/index');

module.exports = { db, User, Course, Topic };
