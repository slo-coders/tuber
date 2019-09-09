const { db, Topic } = require('../server/db/index');
const app = require('../server/server'); //does not start server
const request = require('supertest'); //client

const fauxios = request(app);  //supertest both ports and makes HTTP requests to app

const newTopic = {
  title: "TestTitle",
  descirption: "I am a test",
  dueDateRequired: false,
  dueAt: "2019-09-30 17:00:00-07",
  htmlURL: "testURL.test"
};

describe('`/api/topics` route handling a GET request', () => {
  it('returns all available topics', async () => {
    const response = await fauxios.get('/api/topics');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('title');
  });
});

describe('`/api/topics` route handling a POST request', () => {
  it('returns posts a new course and course content', async () => {
    const response = await fauxios
      .post('/api/topics')
      .send(newTopic);
    expect(response.status).toEqual(201);
    expect(response.body.title).toBe('TestTitle');
  });
});

describe('`/api/topics/:id` route handling a PUT and DELETE request', () => {
  let topic;
  beforeAll(async () => {
    topic = await Topic.findOne({
      where: {
        title: 'Limits',
      },
    });
  });
  it('Edits topic info based on a topic ID', async () => {
    const response = await fauxios
      .put(`/api/topics/${topic.id}`)
      .send({ title: 'TestTitleUpdated'});
    expect(response.status).toEqual(200);
    expect(response.body.title).toEqual('TestTitleUpdated');
  });
  it('DELETE a topic from the topic list', async () => {
    const response = await fauxios.delete(`/api/topic/${topic.id}`);
    const noResponse = await fauxios.get(`/api/topic/${topic.id}`);
    expect(noResponse.body.id).toBe(undefined);
    expect(response.status).toEqual(204);
  });
});

afterAll(() => db.close());
