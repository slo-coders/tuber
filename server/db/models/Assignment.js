const db = require('../db');

// Model Definition
const Assignment = db.define('assignment',
    {
      title: {
        type: db.Sequelize.STRING
      },
      description: {
        type: db.Sequelize.TEXT,
        allowNull: false
      },
      dueDateRequired: {
        type: db.Sequelize.BOOLEAN
      },
      dueAt: {
        type: db.Sequelize.DATE
      },
      htmlURL: {
        type: db.Sequelize.STRING
    }
});

// Class Methods
Assignment.updateInfo = async function (id, updatesObj) {
  const assignment = await this.findByPk(id);
  const updatedAssignment = {...assignment, ...updatesObj};
  return await Assignment.update(updatedAssignment, {fields: ['title', 'description', 'dueDateRequired', 'dueAt', 'htmlURL']});
};
Assignment.remove = async function (id) {
  const assignment = await this.findByPk(id);
  await assignment.destroy();
};


module.exports = Assignment;
