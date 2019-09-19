const db = require('../db');
const Sequelize = require('sequelize');

const UserMeetup = db.define('user_meetup', {
  userMeetupId: {
    primarayKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },

  userType: {
    type: Sequelize.ENUM,
    values: ['mentor', 'mentee', 'peer'],
  },
  /*
  softSkillsRating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 500,
      min: 0,
    },
  },
 */
  proficiencyRating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 500,
      min: 0,
    },
  },
  userConfirmation: {
    type: Sequelize.BOOLEAN,
  },

  comments: {
    type: Sequelize.TEXT,
  },
});

UserMeetup.updateUserMeetup = async function(userId, meetupId, req) {
  const userMeetup = await this.findAll({
    where: { meetupId },
  });
  const partnerStats = userMeetup.filter(el => el.userId !== userId);
  const personalStats = userMeetup.filter(el => el.userId === userId);
  const updatePersonalStats = await personalStats[0].update({
    userType: req.body.userType,
    comments: req.body.comments,
  });

  const updatePartnerStats = await partnerStats[0].update({
    // softSkillsRating: req.body.softSkillsRating,
    proficiencyRating: req.body.proficiencyRating,
  });

  return [updatePartnerStats, updatePersonalStats];
};
module.exports = UserMeetup;
