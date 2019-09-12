const db = require('../db');
const Sequelize = require('sequelize');

const UserSession = db.define('user_session', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true,
  },
  userType: {
    type: Sequelize.ENUM,
    values: ['mentor', 'mentee', 'peer'],
  },

  selectedTopics: {
    type: Sequelize.ARRAY(
      Sequelize.ENUM([
        'Simplifying Polynomials',
        'Factoring Polynomial',
        'Complex Fractions',
      ]),
    ),
  },

  selectedCourse: {
    type: Sequelize.ENUM,
    values: [
      'Intermediate Algebra',
      'Calculus 1',
      'Partial Differential Equations',
    ],
  },

  status: {
    type: Sequelize.ENUM,
    values: ['waiting', 'matched'],
    defaultValue: 'waiting',
  },
});

UserSession.beforeCreate(usersession => {
  const convertArray = item => {
    if (Array.isArray(item) === false) {
      item = [item];
    }
    return item;
  };
  usersession.selectedTopics = convertArray(usersession.selectedTopics);
});
UserSession.beforeUpdate(usersession => {
  const convertArray = item => {
    if (Array.isArray(item) === false) {
      item = [item];
    }
    return item;
  };
  usersession.selectedTopics = convertArray(usersession.selectedTopics);
});

// Class methods
// UserSession.postUserSession = async function(userId, topics, userType) {
//   const userSessionFromUser = await Session.findOne({
//     where: { userId: userId },
//   });

//   const newSessionInfo = {
//     userId,
//     sid: userSessionFromUser.sid,
//     selectedTopics: topics,
//     userType,
//   };

//   return newSessionInfo;
// };

UserSession.updateUserSession = async function(userInfo) {
  {
    const sessionUser = await this.findOne({
      where: { userId: userInfo.userId },
    });

    const updatedUserSession = {
      userType: userInfo.type,
      status: userInfo.status,
      selectedTopics: userInfo.topics.split(', '),
    };
    return await sessionUser.update(updatedUserSession);
  }
};

UserSession.findActiveUsersByType = async function() {
  const allSessions = await this.findAll({ where: { status: 'waiting' } });
  const mentors = allSessions.filter(user => user.userType === 'mentor');
  const mentees = allSessions.filter(user => user.userType === 'mentee');
  const peers = allSessions.filter(user => user.userType === 'peer');
  const activeUsers = { mentors, mentees, peers };
  return activeUsers;
};

module.exports = UserSession;
