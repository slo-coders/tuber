const { UserSession, UserTopic } = require('../index');
const Sequelize = require('sequelize');

//GET mentor, mentee, peer lists from UserSession

const getMenteesAsync = async () => {
  const menteesForAllMentors = {};

  const returnedUsers = await UserSession.findAll();

  const returnedMentors = returnedUsers
    .filter(user => user.userType === 'mentor')
    .sort((a, b) => a.createdAt - b.createdAt);
  const returnedMentees = returnedUsers
    .filter(user => user.userType === 'mentee')
    .sort((a, b) => a.createdAt - b.createdAt);

  await Promise.all(
    returnedMentors.map(async mentor => {
      //find ALL mentor topics
      const mentorUserTopicInstance = await UserTopic.findOne({
        where: {
          userId: mentor.userId,
        },
      });

      // console.log('MENTTORUSER TOPIC INSTANCE', mentorUserTopicInstance);

      if (mentorUserTopicInstance) {
        // Get mentees UserTopic instances based on mentees chosen topic
        // Filter by menteed seletected topic
        const menteeWannabesForTopic = returnedMentees.filter(async mentee => {
          return mentor.selectedTopics.includes(mentee.selectedTopics[0]);
        });

        // Filter by proficiencyRating comparisons
        const potentialMentees = await Promise.all(
          menteeWannabesForTopic.map(async wannabeMentee => {
            /////NEED TO FIND ALL MENTEES FOR ALL MENTOR TOPICS
            //returns only mentees with lower profecincies than mentors

            const possibleMenteesUserTopicInstance = await UserTopic.findOne({
              where: {
                userId: wannabeMentee.userId,
                topicId: wannabeMentee.selectedTopics[0],
                proficiencyRating: {
                  [Sequelize.Op.lt]:
                    mentorUserTopicInstance.proficiencyRating - 50,
                },
              },
            });

            if (possibleMenteesUserTopicInstance) {
              return { wannabeMentee, ...possibleMenteesUserTopicInstance };
            }
            return null;
          }),
        );

        menteesForAllMentors[mentor.userId] = potentialMentees
          .filter(mentee => mentee)
          .map(mentee => ({
            menteeId: mentee.dataValues.userId,
            rating: mentee.dataValues.proficiencyRating,
          }));

        return potentialMentees;
      } else {
        return null;
      }
    }),
  );
  // console.log('POSSIBLE mentees', menteesForAllMentors);
  return menteesForAllMentors;
};

//getMenteesAsync().then(obj => console.log('Mentees: ', obj));

module.exports = getMenteesAsync;
