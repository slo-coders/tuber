const { UserSession, UserTopic } = require('../index');
const Sequelize = require('sequelize');

//GET mentor, mentee, peer lists from UserSession

const getPeersAsync = async () => {
  const peers = {};

  const returnedUsers = await UserSession.findAll();

  const returnedPeers = returnedUsers
    .filter(user => user.userType === 'peer')
    .sort((a, b) => a.createdAt - b.createdAt);

  await Promise.all(
    returnedPeers.map(async peer1 => {
      const peerTopicInstance = await UserTopic.findOne({
        where: {
          userId: peer1.userId,
          topicId: peer1.selectedTopics[0],
        },
      });

      if (peerTopicInstance) {
        // Peers UserTopic instances based on peers chosen topic
        // Filter by peers seletected topic
        const peerWannabesForTopic = returnedPeers.filter(async peer2 => {
          return peer1.selectedTopics[0] === peer2.selectedTopics[0];
        });

        // Filter by proficiencyRating comparisons
        const potentialPeers = await Promise.all(
          peerWannabesForTopic.map(async wannabePeer => {
            //want similar profeciencies
            const possiblePeersUserTopicInstance = await UserTopic.findOne({
              where: {
                userId: wannabePeer.userId,
                topicId: peer1.selectedTopics[0],
                proficiencyRating: {
                  [Sequelize.Op.gt]:
                    peerWannabesForTopic.proficiencyRating - 25,
                  [Sequelize.Op.lt]:
                    peerWannabesForTopic.proficiencyRating + 25,
                },
              },
            });

            if (possiblePeersUserTopicInstance) {
              return { wannabePeer, ...possiblePeersUserTopicInstance };
            }
            return null;
          }),
        );

        peers[peers.userId] = potentialPeers
          .filter(mentor => mentor)
          .map(mentor => ({
            mentorId: mentor.dataValues.userId,
            rating: mentor.dataValues.proficiencyRating,
          }));

        return potentialPeers;
      } else {
        return null;
      }
    }),
  );

  return peers;
};

getPeersAsync().then(obj => console.log('Peers: ', obj));

module.exports = getPeersAsync;
