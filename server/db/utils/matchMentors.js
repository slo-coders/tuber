const { UserSession, UserTopic } = require('../index');
const Sequelize = require('sequelize');

//GET mentor, mentee, peer lists from UserSession

const getMentorsAsync = async () => {
  const mentorsForAllMentees = {};
  // const mentorsForAllMentees = new Map();

  const returnedUsers = await UserSession.findAll();

  const returnedMentors = returnedUsers
    .filter(user => user.userType === 'mentor')
    .sort((a, b) => a.createdAt - b.createdAt);
  const returnedMentees = returnedUsers
    .filter(user => user.userType === 'mentee')
    .sort((a, b) => a.createdAt - b.createdAt);
  // const returnedPeers = returnedUsers
  //   .filter(user => user.userType === 'peer')
  //   .sort((a, b) => a.createdAt - b.createdAt);
  // console.log('RETURNED MENTORS', returnedMentors);
  /*
  const possMentorsUTopInstanz = await Promise.all(
    returnedMentees.map(async menteeUSessInstance => {
      const possibleMentors =
        returnedMentors.filter(async mentorUSessInstance => {
          // try {
          const menteeUserTopicInstance = await UserTopic.findOne({
            //instnace or null
            where: { userId: menteeUSessInstance.userId },
          });
          const mentorUserTopicInstance = await UserTopic.findOne({
            where: { userId: mentorUSessInstance.userId },
          });
          // console.log(
          //   'mentorUserTopicInstance>>>>>>>',
          //   menteeUserTopicInstance.dataValues,
          // );
          if (menteeUserTopicInstance && mentorUserTopicInstance) {
            return (
              mentorUSessInstance.selectedTopics.includes(
                menteeUSessInstance.selectedTopics[0],
              ) &&
              menteeUserTopicInstance.proficiencyRating + 50 <=
                mentorUserTopicInstance.proficiencyRating
            );
          }
          return false;
          // } catch (err) {
          //   console.error(err);
          // }
        }
      );
      return possibleMentors;
    }),
  );
  // console.log('DIRTY LENGTH', possMentorsUTopInstanz);

  const possibleMentorsCleaned = possMentorsUTopInstanz.map(mentor => ({
    mentorId: mentor.dataValues.userId,
    rating: mentor.dataValues.proficiencyRating,
  }));
  console.log('cleaned', possibleMentorsCleaned);
  return possibleMentorsCleaned;
  */

  await Promise.all(
    returnedMentees.map(async mentee => {
      // Mentee's UserTopic instance based on mentees selected topic in UserSession
      const menteeUserTopicInstance = await UserTopic.findOne({
        where: {
          userId: mentee.userId, //breaks if selected topic Id is allowed to go through and mentee hasnt given them any rating
          topicId: mentee.selectedTopics[0],
        },
      });

      if (menteeUserTopicInstance) {
        // Mentors' UserTopic instances based on mentees chosen topic
        // Filter by menteed seletected topic
        const mentorWannabesForTopic = returnedMentors.filter(
          async (mentor, j) => {
            return mentor.selectedTopics.includes(mentee.selectedTopics[0]);
          },
        );

        // Filter by proficiencyRating comparisons
        const potentialMentors = await Promise.all(
          mentorWannabesForTopic.map(async wannabe => {
            //returns only mentors with higher profencies than mentees'
            const possibleMentorUserTopicInstance = await UserTopic.findOne({
              where: {
                userId: wannabe.userId,
                topicId: mentee.selectedTopics[0],
                proficiencyRating: {
                  [Sequelize.Op.gt]:
                    menteeUserTopicInstance.proficiencyRating + 50,
                },
              },
            });

            if (possibleMentorUserTopicInstance) {
              return { wannabe, ...possibleMentorUserTopicInstance };
            }
            return null;
          }),
        );

        mentorsForAllMentees[mentee.userId] = potentialMentors
          .filter(mentor => mentor)
          .map(mentor => ({
            mentorId: mentor.dataValues.userId,
            rating: mentor.dataValues.proficiencyRating,
          }));
        /*         // Map from mentee ({menteeId, rating}) to array of mentors ([] or [{mentorUs}])
        mentorsForAllMentees.set(
          {
            menteeId: mentee.userId,
            userType: mentee.userType,
            rating: menteeUserTopicInstance.dataValues.proficiencyRating,
          },
          potentialMentors
            .filter(mentor => mentor)
            .map(mentor => ({
              mentorId: mentor.dataValues.userId,
              rating: mentor.dataValues.proficiencyRating,
            })),
        ); */

        return potentialMentors;
      } else {
        return null;
      }
    }),
  );
  // console.log('POSSIBLE MENTORE', mentorsForAllMentees);
  return mentorsForAllMentees;
};

// getMentorsAsync();
getMentorsAsync().then(() => console.log('Mentors for mentees: '));

module.exports = getMentorsAsync;

//Next steps
/*Interate though keys --> key and the first element of the value (matched mentor) --> UserMeetp.create()
 */
