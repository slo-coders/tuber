const { UserSession, UserTopic } = require('../index');
const Sequelize = require('sequelize');

/* GET mentor, mentee, peer lists from UserSession */
const getPossiblePartnersAsync = async (
  requestorId,
  requestorType,
  reqSelectedTopics,
) => {
  // GET all active sessions
  let requestorUserTopicInstances;
  // let containOpForSeletedTopicRatings;
  let activeWannabePartners;
  let partnerType;
  let containOpForSeletedTopics;

  switch (requestorType) {
    case 'mentor':
      partnerType = 'mentee';
      // containOpForSeletedTopicRatings = Sequelize.Op.contained;
      containOpForSeletedTopics = Sequelize.Op.contained; //for array.length > 1
      break;
    case 'mentee':
      partnerType = 'mentor';
      // containOpForSeletedTopicRatings = Sequelize.Op.contains;
      containOpForSeletedTopics = Sequelize.Op.contains;
      break;
    case 'peer':
      partnerType = 'peer';
      // containOpForSeletedTopicRatings = Sequelize.Op.contains;
      containOpForSeletedTopics = Sequelize.Op.contains;
      break;
    default:
      break;
  }

  // Find the requestor's userTopic proficiency Rating(s)
  requestorUserTopicInstances = await UserTopic.findAll({
    attributes: ['userId', 'topicId', 'proficiencyRating'],
    where: {
      userId: requestorId,
      topicId: {
        [Sequelize.Op.or]: reqSelectedTopics,
      },
    },
  });

  // Filter by requestor's userType and selectedTopics to find wannabe partners
  activeWannabePartners = await UserSession.findAll({
    where: {
      userId: {
        [Sequelize.Op.ne]: requestorId,
      },
      userType: partnerType,
      selectedTopics: {
        [containOpForSeletedTopics]: reqSelectedTopics,
      },
    },
    // include: [{model: User, include:{model:UserTopic}}],
    order: [['createdAt']],
  });

  // Filter by proficiencyRating comparisons
  let wannabePartnerUserTopicInstances;
  //TODO: refactor into the switch above rather than if-elses and 2nd switch below
  const potentialPartners = await Promise.all(
    activeWannabePartners.map(async wannabe => {
      if (requestorType === 'mentee') {
        //want mentors
        wannabePartnerUserTopicInstances = await UserTopic.findAll({
          where: {
            userId: wannabe.userId,
            topicId: {
              [Sequelize.Op.or]: wannabe.selectedTopics,
            },
            proficiencyRating: {
              [Sequelize.Op.gte]:
                requestorUserTopicInstances[0].dataValues.proficiencyRating +
                50,
            },
          },
        });
        // }
      } else if (requestorType === 'peer') {
        //want peers
        const matchingReqUserTopic = requestorUserTopicInstances.filter(
          uTop => uTop.topicId === wannabe.selectedTopics[0],
        );
        if (matchingReqUserTopic.length) {
          wannabePartnerUserTopicInstances = await UserTopic.findAll({
            where: {
              userId: wannabe.userId,
              topicId: {
                [Sequelize.Op.or]: wannabe.selectedTopics,
              },
              proficiencyRating: {
                [Sequelize.Op.between]: [
                  matchingReqUserTopic[0].dataValues.proficiencyRating - 50,
                  matchingReqUserTopic[0].dataValues.proficiencyRating + 50,
                ],
              },
            },
          });
        }
      } else if (requestorType === 'mentor') {
        //want mentees
        const matchingReqUserTopic = requestorUserTopicInstances.filter(
          uTop => uTop.topicId === wannabe.selectedTopics[0],
        );

        if (matchingReqUserTopic.length) {
          wannabePartnerUserTopicInstances = await UserTopic.findOne({
            where: {
              userId: wannabe.userId,
              topicId: {
                [Sequelize.Op.or]: wannabe.selectedTopics,
              },
              proficiencyRating: {
                [Sequelize.Op.lte]:
                  matchingReqUserTopic[0].dataValues.proficiencyRating - 50,
              },
            },
          });
        }
      }

      switch (requestorType) {
        case 'mentor':
          if (wannabePartnerUserTopicInstances) {
            return {
              userId: wannabe.userId,
              location: wannabe.location,
              userType: wannabe.userType,
              selectedTopics: [
                {
                  topicId: wannabePartnerUserTopicInstances.topicId,
                  proficiencyRating:
                    wannabePartnerUserTopicInstances.proficiencyRating,
                },
              ],
            };
          }
          break;
        case 'mentee':
        case 'peer':
          if (wannabePartnerUserTopicInstances.length) {
            return {
              userId: wannabe.userId,
              location: wannabe.location,
              userType: wannabe.userType,
              selectedTopics: wannabePartnerUserTopicInstances.map(uti => ({
                topicId: uti.topicId,
                proficiencyRating: uti.proficiencyRating,
              })),
            };
          }
          break;
      }
      return null;
    }),
  );

  return potentialPartners.filter(partner => partner);
};

//TODO: CHECK FOR ONE USER WITH NO OTHER USER SESSIONS
// getPossiblePartnersAsync('17db3019-0d2d-4fcf-a3c2-dd3f1bceb41c', 'mentor', ['15cff6c2-2662-4bd4-a3a8-dffd5e1d2abf','999960fa-73a6-49a2-9ed9-432f76ef5008','4c363db0-f4d7-4960-a520-af013853cc71','1d9af49c-9ee6-4b56-ae9c-478296ec2479']).then((obj) => console.log('Partners for user: ', obj));

module.exports = getPossiblePartnersAsync;
