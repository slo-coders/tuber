const db = require('./db');
const { User, Course, Meetup } = require('./models/index');

module.exports = { db, User, Course, Meetup };
