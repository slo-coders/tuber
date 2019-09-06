const Sequelize = require('sequelize');
const pkg = require('../../package.json');

const dbPort = process.env.DB_PORT || 5432;
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}_test` : pkg.name;

const dbUrl =
  process.env.DATABASE_URL || `postgres://localhost:${dbPort}/${dbName}`;

const db = new Sequelize(dbUrl, { logging: false });

db.authenticate()
  .then(() => {
    console.log(`Sequelize successfully connected to: ${dbUrl}`);
  })
  .catch(e => {
    console.error('Sequelize failed to connect.', e);
  });

module.exports = db;
