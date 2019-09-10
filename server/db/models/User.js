const db = require('../db');
const { hash } = require('../utils/hash');

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
  const data = hash(user.password);
  user.password = data.hash;
  user.salt = data.salt;
});

User.beforeUpdate(user => {
  const data = hash(user.password);
  user.password = data.hash;
  user.salt = data.salt;
});

User.beforeValidate(studentSubmitted => {
  if (studentSubmitted.schoolId === '') {
    studentSubmitted.schoolId = null;
  }
});

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
    fields: ['firstName', 'lastName', 'password', 'salt', 'email', 'imageUrl'],
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
      password: hash(password),
    },
  });
};

module.exports = User;
