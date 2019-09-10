const db = require('../db');
const crypto = require('crypto');

// Model Definition
const User = db.define('user', {
  userId: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  salt: {
    type: db.Sequelize.STRING,
  },

  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  imageUrl: {
    type: db.Sequelize.STRING(800),
    validate: {
      isUrl: true,
    },
  },
});

// Lifecycle Events (a.k.a. Hooks)
User.beforeCreate(user => {
  const data = User.hashPassword(user.password);
  user.password = data.hash;
  user.salt = data.salt;
});

User.beforeUpdate(user => {
  const data = User.hashPassword(user.password);
  user.password = data.hash;
  user.salt = data.salt;
});

User.beforeValidate(studentSubmitted => {
  if (studentSubmitted.schoolId === '') {
    studentSubmitted.schoolId = null;
  }
});

//Set passwwords
User.hashPassword = function(password) {
  this.salt = crypto.randomBytes(32).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt: this.salt, hash: this.hash };
};

//Verify Passwords
User.verifyPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

// Class Methods
User.updateInfo = async function(userId, updatesObj) {
  const user = await this.findByPk(userId);
  const updatedStudent = { ...user, ...updatesObj };
  return await user.update(updatedStudent, {
    fields: ['firstName', 'lastName', 'password', 'email', 'imageUrl'],
  });
};

User.createNew = async function(userObj) {
  return await this.create(userObj, {
    fields: ['firstName', 'lastName', 'password', 'email', 'imageUrl'],
  });
};

User.remove = async function(userId) {
  const user = await this.findByPk(userId);
  await user.destroy();
};

User.login = async function(email, password) {
  return await this.findOne({
    where: {
      email,
      password: User.hashPassword(password),
    },
  });
};

module.exports = User;
