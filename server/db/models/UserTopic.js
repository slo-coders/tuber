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

UserTopic.createArr = async function(userId, arrOfUserTopics) {
  //`this` binds to this function's parent
  return await Promise.all(
    arrOfUserTopics.map(async uTop => {
      const [uTopReturned] = await this.findOrCreate({
        //`this` will will not bind to parent of arrow function
        where: {
          userId,
          topicId: uTop.topicId,
        },
      });
      return await uTopReturned.update({
        proficiencyRating: uTop.proficiencyRating,
      });
    }),
  );
};

UserTopic.updateInfo = async function(updatedUserTopicObj) {
  const { userId, topicId, proficiencyRating } = updatedUserTopicObj;
  const userTopic = await this.findOne({
    where: { userId, topicId },
  });
  if (userTopic.id) {
    return await userTopic.update(
      {
        topicId,
        proficiencyRating,
      },
      {
        fields: ['topicId', 'proficiencyRating'],
      },
    );
  }
};
