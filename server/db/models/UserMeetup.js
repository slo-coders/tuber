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
  /* DELETE ?
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

  status: {
    type: Sequelize.ENUM,
    values: ['pending confirmation', 'matched', 'pending review', 'completed'],
    defaultValue: 'pending confirmation',
  },

/*  DELETE THIS? 
    comments: {
    type: Sequelize.TEXT,
  }, */
});

UserMeetup.ratePartnerUserMeetup = async function(userId, meetupId, newPartnerProfRating) {
  const userMeetup = await this.findAll({
    where: { meetupId },
  });
  const partnerUserMeetupInst = userMeetup.filter(el => el.userId !== userId);
  const personalUserMeetupInst = userMeetup.filter(el => el.userId === userId);

  const updatedPersonalUserMeetup = await personalUserMeetupInst[0].update({
    status: 'completed',  
  });

  const updatedPartnerUserMeetup = await partnerUserMeetupInst[0].update({
    // softSkillsRating: newPartnerSoftSkillsRating,
    proficiencyRating: newPartnerProfRating,
  });

  return {partnerMeetupInfo: updatedPartnerUserMeetup, personalMeetupInfo: updatedPersonalUserMeetup};
};
module.exports = UserMeetup;
