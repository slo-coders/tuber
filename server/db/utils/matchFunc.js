const { UserSession, UserTopic } = require('../index');
const Sequelize = require('sequelize');

//GET mentor, mentee, peer lists from UserSession

let returnedUsers;

const getMentors = async () => {
  const mentorsForEachMentee = {};

  returnedUsers = await UserSession.findAll();

  const returnedMentors = returnedUsers
    .filter(user => user.userType === 'mentor')
    .sort((a, b) => a.createdAt - b.createdAt);
  const returnedMentees = returnedUsers
    .filter(user => user.userType === 'mentee')
    .sort((a, b) => a.createdAt - b.createdAt);
  // const returnedPeers = returnedUsers
  //   .filter(user => user.userType === 'peer')
  //   .sort((a, b) => a.createdAt - b.createdAt);

  returnedMentees.map(async mentee => {
    // Mentee's UserTopic instance based on mentees selected topic in UserSession
    let menteeUserTopicInstance = await UserTopic.findOne({
      where: {
        userId: mentee.userId, //breaks if selected topic Id is allowed to go through and mentee hasnt given them any rating
        topicId: mentee.selectedTopics[0],
      },
    });

    if (menteeUserTopicInstance) {
      // console.log('MENTEE >>>>>>>>>>>>>>>>>>', {
      //   userId: menteeUserTopicInstance.userId,
      //   rating: menteeUserTopicInstance.proficiencyRating,
      // });

      // Mentors' UserTopic instances based on mentees chosen topic
      // Filter by menteed seletected topic
      const mentorWannabesForTopic = returnedMentors.filter(
        async (mentor, j) => {
          return mentor.selectedTopics.includes(mentee.selectedTopics[0]);
        },
      );
      /* console.log(
          `Number of wannabe mentors for topic ${mentee.selectedTopics[0]}: `,
          mentorWannabesForTopic.length,
        ); */

      // Filter by proficiencyRating comparisons
      const potentialMentors = await Promise.all(
        mentorWannabesForTopic.map(async (wannabe, k) => {
          //returns only mentors with higher profencies than mentees'
          const possibleMentorUserTopicInstance = await UserTopic.findOne({
            where: {
              userId: wannabe.userId, //breaks if selected topic Id is allowed to go through and mentee hasnt given them any rating
              topicId: mentee.selectedTopics[0],
              proficiencyRating: {
                [Sequelize.Op.gt]:
                  menteeUserTopicInstance.proficiencyRating + 50,
              },
            },
          });

          if (possibleMentorUserTopicInstance) {
            // console.log(
            //   `Mentee ${i}'s Possible Mentor ${k} w/ rating >>>>>`,
            //   possibleMentorUserTopicInstance.userId,
            //   possibleMentorUserTopicInstance.proficiencyRating,
            // );
            return { wannabe, ...possibleMentorUserTopicInstance };
          }
          return null;
        }),
      );

      //building object of mentee keys and array of mentor values
      mentorsForEachMentee[mentee.userId] = potentialMentors
        .filter(mentor => mentor)
        .map(mentor => ({
          mentorUserId: mentor.dataValues.userId,
          rating: mentor.dataValues.proficiencyRating,
        }));

      console.log(
        `Array of possible mentors for mentee >>> ${mentee.userId}`,
        mentorsForEachMentee[mentee.userId].length,
      );

      // return mentorsForEachMentee;
    } else {
      return null;
    }
  });
  return mentorsForEachMentee;
};

const logIt = () => {
  getMentors().then(dic => console.log(dic));
};
logIt();
