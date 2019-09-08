const request = require('supertest');
const app = require('../server/server');
const { Topic, db } = require('../server/db/index');

const fauxios = request(app);

/*

describe('GET topics', () => {
  it('returns all available topics', async () => {
    const response = await fauxios.get('/api/topics');
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('title');
  });
});

*/
