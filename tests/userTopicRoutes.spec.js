const { db, User, Topic, UserTopic } = require('../server/db/index');
const randIntBtwn = require('../server/db/utils/randIntBtwn');
const app = require('../server/server');
const request = require('supertest'); //client

const fauxios = request(app); //supertest both ports and makes HTTP requests to app

let userId, topics, currentUserReturned;


//Tests
describe('Routes for a new user\'s topic information', () => {
  //Hooks
  beforeAll(async () => {
    const currentUser = {
      firstName: 'Hugo',
      lastName: 'Campos',
      email: 'emailhugocampos@gmail.com', //needs to be unique relative to other test-created users
      imageUrl: 'https://avatars.dicebear.com/v2/bottts/012.svg',
      password: 'test'
    };

    //Getting dummy User id from User table in seeded db 
    currentUserReturned = await User.create(currentUser);
    userId = currentUserReturned.id;
  });

  afterAll(async () => {
    await currentUserReturned.destroy();
    await db.close();
    console.log('DB closed.');
  });
  

  describe('`/api/user/:userId/topics/` route handling a POST request to create an array of userTopics in the UserTopics model', () => {
    it('responds with the newly created user-topic instances, each with an id', async () => {      
      //Get Topic data from Topic table
      topics = await Topic.findAll();
      //Get UserTopic data for currentUser
      const userTopics = await UserTopic.findAll({where: {userId}});
      const userTopicsIds = userTopics.map(uTop => uTop.id);
      const start = randIntBtwn(0, topics.length - 1);
      const end = randIntBtwn(start + 1, topics.length + 1);
      const newlyRatedTopicIds = topics.slice(start, end)
      .map(topic => topic.id)
      .filter(topicId => !userTopicsIds.includes(topicId));
      const ratedTopicsArr = newlyRatedTopicIds
      .map(topicId => ({
          topicId,
          proficiencyRating: randIntBtwn(0, 500),
      }));

      const res = await fauxios.post(`/api/users/${userId}/topics`).send(ratedTopicsArr);
      expect(res.status).toEqual(201);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining([
          'id',
          'userId',
          'topicId',
          'proficiencyRating'
        ]),
      );
      expect(res.body[0]).toHaveProperty('userId', userId);
    });
  });

  describe('`/api/user/:userId/topics/` route handling GET request', () => {
    it('responds with an array', async () => {
      const res = await fauxios.get(`/api/users/${userId}/topics`);
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
    });
    it('responds with array of user\'s course topics and corresponding proficiency ratings as a number', async () => {
      const res = await fauxios.get(`/api/users/${userId}/topics`);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining([
          'id',
          'userId',
          'topicId',
          'proficiencyRating'
        ])
      );
      expect(res.body[0]).toHaveProperty('userId', userId);
      expect(typeof res.body[0].proficiencyRating === 'number').toEqual(true);
    });
  });
});
