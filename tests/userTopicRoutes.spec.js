const { db, User, Topic, UserTopic } = require('../server/db/index');
const randIntBtwn = require('../server/db/utils/randIntBtwn');
const app = require('../server/server');
const request = require('supertest'); //client

const fauxios = request(app); //supertest both ports and makes HTTP requests to app

let userId, topics, currentUserReturned, topicId;
let ratedTopicsArr = [];

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.close();
  console.log('DB closed.');
});

//Tests
describe("Routes for a new user's topic information", () => {
  beforeAll(async () => {
    //Create dummy User id from User table
    const currentUser = await User.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });
    currentUserReturned = currentUser[0];
    userId = currentUserReturned.id;

    //Create UserTopic data for currentUser
    topics = await Topic.findAll();

    do {
      const userTopics = await UserTopic.findAll({ where: { userId } });
      const userTopicsTopicIds = userTopics.map(uTop => uTop.topicId);
      const start = randIntBtwn(1, topics.length - 1);
      const end = randIntBtwn(start + 1, topics.length + 1);
      const newlyRatedTopicIds = topics
        .slice(start, end)
        .map(topic => topic.id)
        .filter(topicId => !userTopicsTopicIds.includes(topicId));
      ratedTopicsArr = newlyRatedTopicIds.map(topicId => ({
        topicId,
        proficiencyRating: randIntBtwn(0, 500),
      }));
      topicId = topics[0].id;
    } while (!topicId);
  });

  describe('`/api/users/:userId/topics/` route handling a POST request to create an array of userTopics in the UserTopics model', () => {
    xit('responds with the newly created user-topic instances, each with an id', async () => {
      const apiRoute = `/api/users/${userId}/topics`;
      const res = await fauxios.post(apiRoute).send(ratedTopicsArr);
      expect(res.status).toEqual(201);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining([
          'id',
          'userId',
          'topicId',
          'proficiencyRating',
        ]),
      );
      expect(res.body[0]).toHaveProperty('userId', userId);
    });
  });

  describe('`/api/users/:userId/topics/` route handling GET request', () => {
    it('responds with an array', async () => {
      const res = await fauxios.get(`/api/users/${userId}/topics`);
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
    });
    xit("responds with array of user's course topics and corresponding proficiency ratings as a number", async () => {
      const res = await fauxios.get(`/api/users/${userId}/topics`);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining(['id', 'userId', 'topics']),
      );
      expect(res.body[0]).toHaveProperty('userId', userId);
      expect(typeof res.body[0].proficiencyRating === 'number').toEqual(true);
    });
  });

  /* describe('`/api/users/:userId/topics/:topicId` route handling GET request', () => {
    xit('responds with a single instance of a UserTopic, including proficiencyRating',
    async () => {
      const res = await fauxios.get(`/api/users/${userId}/topics/${topicId}`);
      expect(res.status).toEqual(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining([
          'id',
          'userId',
          'topicId',
          'proficiencyRating'
        ])
      );
    });
  }); */

  describe('`/api/users/:userId/topics/:topicId` route handling PUT request', () => {
    xit('responds with an updated instance of a UserTopic that includes a new proficiencyRating', async () => {
      //Get one userTopicId
      const res = await fauxios
        .put(`/api/users/${userId}/topics/${topicId}`)
        .send({
          proficiencyRating: 5,
        });
      console.log('res.body from PUT >>>>>> ', res.body);
      expect(res.status).toEqual(202);
      expect(Object.keys(res.body)).toHaveProperty('profiencyRating', 5);
      const res2 = await fauxios
        .put(`/api/users/${userId}/topics/${topicId}`)
        .send({
          proficiencyRating: 2.5,
        });
      expect(res2.status).toEqual(202);
      expect(Object.keys(res2.body)).toHaveProperty('profiencyRating', 2.5);
      expect(Object.keys(res2.body)).toHaveProperty('userId', userId);
      expect(Object.keys(res2.body)).toHaveProperty('topicId', topicId);
    });
  });
});
