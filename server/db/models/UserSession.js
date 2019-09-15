const db = require('../db');
const Sequelize = require('sequelize');
const convertArray = require('../utils/convertArray');

const UserSession = db.define('user_session', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true,
  },

  userTopics: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },

  userType: {
    type: Sequelize.ENUM,
    values: ['mentor', 'mentee', 'peer'],
    allowNull: false,
  },

  location: {
    type: Sequelize.ENUM,
    values: ['library', 'computer lab', 'cafe', 'dorm lounge'],
  },
  //Need to figure our how to further validate this, maybe as a class funciton. Mixing DataTypes ARRAY and ENUM is problematic
  selectedTopics: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },

  status: {
    type: Sequelize.ENUM,
    values: ['waiting', 'matched'],
    defaultValue: 'waiting',
  },

  reviewStatus: {
    type: Sequelize.ENUM,
    values: ['review submitted', 'no review'],
    defaultValue: 'no review',
  },
});

//Hooks to get convert comma strings into an array for storage
UserSession.beforeCreate(usersession => {
  usersession.selectedTopic = convertArray(usersession.selectedTopic);
});
UserSession.beforeUpdate(usersession => {
  usersession.selectedTopic = convertArray(usersession.selectedTopic);
});

//Should exist only in UserMeetup
// UserSession.updateUserSession = async function(userId, userInfo) {
//   {
//     const sessionUser = await this.findOne({
//       where: { userId: userId },
//     });

//     const updatedUserSession = {
//       userType: userInfo.type,
//       status: userInfo.status,
//       location: userInfo.location,
//       selectedTopic:
//         userInfo.topicId === undefined
//           ? sessionUser.selectedTopic
//           : userInfo.selectedTopic.split(','),
//       reviewStatus: userInfo.reviewStatus,
//     };

//     return await sessionUser.update(updatedUserSession);
//   }
// };

UserSession.findActiveUsersByType = async function() {
  const allSessions = await this.findAll({ where: { status: 'waiting' } });
  const mentors = allSessions.filter(user => user.userType === 'mentor');
  const mentees = allSessions.filter(user => user.userType === 'mentee');
  const peers = allSessions.filter(user => user.userType === 'peer');
  const activeUsers = { mentors, mentees, peers };
  return activeUsers;
};

module.exports = UserSession;
