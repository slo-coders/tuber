const db = require('../db');
const Sequelize = require('sequelize');

const UserTopic = db.define('user_topic', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  proficiencyRating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 500,
      min: 0,
    },
  },
});

module.exports = UserTopic;

UserTopic.createArr = async (userId, arrOfUserTopics) => {
    return await Promise.all(arrOfUserTopics.map(uTop => 
      UserTopic.create({
      userId,
      topicId: uTop.topicId,
      proficiencyRating: uTop.proficiencyRating
    }))
  );
};