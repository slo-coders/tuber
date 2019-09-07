const db = require('../db');

// Model Definition
const Topic = db.define('topic', {
  id: {
    type: db.Sequelize.UUID,
    defaultValue: db.Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: db.Sequelize.STRING,
  },
  description: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
  dueDateRequired: {
    type: db.Sequelize.BOOLEAN,
  },
  dueAt: {
    type: db.Sequelize.DATE,
  },
  htmlURL: {
    type: db.Sequelize.STRING,
  },
});

// Class Methods
Topic.updateInfo = async function(id, updatesObj) {
  const topic = await this.findByPk(id);
  const updatedTopic = { ...topic, ...updatesObj };
  return await Topic.update(updatedTopic, {
    fields: ['title', 'description', 'dueDateRequired', 'dueAt', 'htmlURL'],
  });
};
Topic.remove = async function(id) {
  const targetTopic = await this.findByPk(id);
  await targetTopic.destroy();
};

module.exports = Topic;
