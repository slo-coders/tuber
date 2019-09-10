const db = require('./db');

module.exports = { ...require('./models/index'), db };
