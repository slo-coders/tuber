const getPossibleParnersAsync = require('./getPossiblePartners');
const {
  UserMeetup,
  UserTopic,
  Meetup,
  MeetupTopic,
} = require('../models/index');

let partnerUserMeetupInstance;
let reqUserMeetupInstance;
const findAMatch = async (
  reqUserId,
  reqUserType,
  location,
  selectedTopicsArr,
) => {
  return await getPossibleParnersAsync(
    reqUserId,
    reqUserType,
    selectedTopicsArr,
  ).then(async possiblePartnersArrForRequestor => {
    /* CREATE Meetup instance with user's meetupType and location*/
    //TODO: remove timeMatched from Meetup model (use createdAt)
    if (possiblePartnersArrForRequestor.length) {
      const meetup = await Meetup.create({
        location,
        meetupType:
          reqUserType === 'mentee' || reqUserType === 'mentor' ? 'M:M' : 'P:P',
      });

      /* CREATE 2 UserMeetup instances with 2 userIds */
      // Find Requestor's "first" UserTopic instance (w/ proficiencyRating)
      const requetorsUserTopicInstance = await UserTopic.findOne({
        where: {
          userId: reqUserId,
          topicId:
            reqUserType === 'mentor'
              ? possiblePartnersArrForRequestor[0].selectedTopics[0].topicId
              : selectedTopicsArr[0],
        },
      });
      // CREATE Requestor's UserMeetup
      reqUserMeetupInstance = await UserMeetup.create({
        userId: reqUserId,
        userType: reqUserType,
        meetupId: meetup.id,
        proficiencyRating: requetorsUserTopicInstance.proficiencyRating,
      });

      // CREATE Partner UserMeetup
      const partner = possiblePartnersArrForRequestor[0];
      const {
        userId: partnerId,
        userType: partnerType,
        selectedTopics,
      } = partner;
      const partnerProfRating =
        partnerType === 'mentor'
          ? selectedTopics.filter(
              utiObj => utiObj.topicId === requetorsUserTopicInstance.topicId,
            )[0].proficiencyRating
          : selectedTopics[0].proficiencyRating;

      partnerUserMeetupInstance = await UserMeetup.create({
        userId: partnerId,
        userType: partnerType,
        meetupId: meetup.id,
        proficiencyRating: partnerProfRating,
      });

      // CREATE MeetupTopic instace with topicId from requestor's UserTopic
      MeetupTopic.create({
        meetupId: meetup.id,
        topicId: requetorsUserTopicInstance.topicId,
      });
    }
    return {
      reqUser: reqUserMeetupInstance,
      partner: partnerUserMeetupInstance,
    };
  });
};

module.exports = findAMatch;

//           //TODO:
//           //CONFIRM MEETUP BTWN MENTEE AND MENTOR BEFORE DESTROYING USER
//           //IF CONFIRMED === 'FALSE', delete mentor from mentee's possible mentors array, but DO NOT DELETE userSession

//           // DESTROY mentee's recently created UserSession instance
//           userSession.destroy();

//           // DESTROY mentor's pre-existing UserSession instance
//           const mentorUserSession = await UserSession.findOne({
//             where: { userId: partnerId },
//           });
//           await mentorUserSession.destroy();

//           //RESPOND with UserMeetup info
//           res.status(201).send({mentee: reqUserMeetupInstance, mentor: partnerUserMeetupInstance});
//         }
//         else {
//           res.send(userSession);
//         }

//         // RE-RUN getMentors to delete mentee from keys in object, and
//         // delete mentors from possibleMentors arrays for other users/mentees
//         //getMentorAsync();
//         getPossibleParnersAsync(userId, userType)
