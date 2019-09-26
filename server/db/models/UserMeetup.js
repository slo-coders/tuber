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


});

UserMeetup.updatePartnerUserMeetup = async function(
  userId,
  meetupId,
  newPartnerInfo,
) {
  const userMeetup = await this.findAll({
    where: { meetupId },
  });
  const partnerUserMeetupInst = userMeetup.filter(el => el.userId !== userId);
  const personalUserMeetupInst = userMeetup.filter(el => el.userId === userId);

  //Since the route is currently making the mistake of taking both a partner's proficiencyRating
  //and updating a user's own status, we'll need to filter otu proficiencyt rating
  let updatedPartnerUserMeetup;
  if (newPartnerInfo.proficiencyRating) {
    updatedPartnerUserMeetup = await partnerUserMeetupInst[0].update({
      proficiencyRating: newPartnerInfo.proficiencyRating,
    });
  }
  if (newPartnerInfo.partnerStatus) {
    updatedPartnerUserMeetup = await partnerUserMeetupInst[0].update({
      status: newPartnerInfo.partnerStatus,
    });
  }
  
  delete newPartnerInfo.proficiencyRating;
  delete newPartnerInfo.partnerStatus;
  //User's status is updated
  const userUpdatedInfo = newPartnerInfo;
  // console.log('In UserMeetup.updatePartnerUserMeetup, userUpdatedInfo >>>>> ', userUpdatedInfo.userStatus);
  const updatedPersonalUserMeetup = await personalUserMeetupInst[0].update(
    {...userUpdatedInfo,
    status: userUpdatedInfo.userStatus}
  );

  return {
    partnerMeetupInfo: updatedPartnerUserMeetup,
    personalMeetupInfo: updatedPersonalUserMeetup,
  };
};
module.exports = UserMeetup;
