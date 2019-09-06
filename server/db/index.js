const db = require('./db');
const { User, Course, Assignment } = require('./models/index');

module.exports = { db, User, Course, Assignment };
