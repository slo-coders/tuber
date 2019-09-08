const request = require('supertest');
const app = require('../server/server');
const { Meetup, db } = require('../server/db/index');

describe('`/api/meetups` route handling a GET request', () => {
  it('returns all ,eets', async () => {
    const response = await request(app).get('/api/meetups');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(4);
    expect(response.body[0]).toHaveProperty('location');
  });
});

describe('`/api/meetups` route handling a POST request', () => {
  it('returns posts a new meetup instance', async () => {
    const response = await request(app)
      .post('/api/meetups')
      .send({
        meetupType: 'P:P',
        location: 'Computer Lab',
        matchedAt: new Date(),
        meetupEnded: new Date(),
      });
    expect(response.status).toEqual(201);
    expect(response.body.location).toBe('Computer Lab');
    expect(response.body.matchedAt).toBeTruthy;
  });
});

describe('`/api/meetups/:meetupId` route handling a PUT and DELETE request', () => {
  let meet;
  beforeAll(async () => {
    meet = await Meetup.findOne({
      where: {
        location: 'Coffee Shop',
      },
    });
  });
  it('Edits meetup info based on a MeetupId', async () => {
    const response = await request(app)
      .put(`/api/meetups/${meet.id}`)
      .send({ location: 'Secret Garden', meetupType: 'P:P' });
    expect(response.status).toEqual(200);
    expect(response.body.location).toEqual('Secret Garden');
    expect(response.body.meetupType).toEqual('P:P');
  });
  it('DELETE removes a meetup', async () => {
    const response = await request(app).delete(`/api/meetups/${meet.id}`);
    const noResponse = await request(app).get(`/api/meetups/${meet.id}`);
    expect(noResponse.body.id).toBeUndefined();
    expect(response.status).toEqual(204);
  });
});

afterAll(() => db.close());
