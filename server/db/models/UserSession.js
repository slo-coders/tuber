const db = require('../db');
const Sequelize = require('sequelize');

const UserSession = db.define('usersession', {
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
      Sequelize.ENUM({
        values: [
          'Simplifying Polynomials',
          'Factoring Polynomial',
          'Complex Fractions',
          'Limits',
          'Differentiation',
          'Continuity',
          'Orthogonal Functions',
          'Legendre Polynomial',
        ],
      }),
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
});

module.exports = UserSession;
