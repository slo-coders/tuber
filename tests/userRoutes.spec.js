const { db, User} = require('../server/db/index');
const seed = require('../server/db/utils/seed');
const app = require('../server/server');
const request = require('supertest');

const fauxios = request(app);  //supertest both ports and makes HTTP requests to app

const newUser = {
  firstName: "Hugo",
  lastName: "Campos",
  email: "contacthugocampos@gmail.com",
  imageUrl: "https://avatars.dicebear.com/v2/bottts/012.svg"
}

let newUserId;

//Hooks
/* beforeAll(async () => {
  await seed();
}); */
afterAll(async () => {
  await db.close()
  console.log('DB closed.')
});

//Tests
describe('Express routes for users', () => {
  describe('`/api/users` route handling a GET request', () => {
    it('responds with an array of all available users', async () => {
      const res = await fauxios.get('/api/users');
      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(10);
      expect(Object.keys(res.body[0])).toEqual(expect.arrayContaining(
        ['userId', 'firstName', 'lastName', 'email', 'imageUrl']
      ));
    });
  });

  describe('`/api/users` route handling a POST request', () => {
    it('responds with new user instance with an id', async () => {
      const res = await fauxios.post('/api/users')
        .send(newUser);
      newUserId = res.body.userId;
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('userId');
      expect(res.body).toMatchObject(newUser);
    });
  });
})

describe('Express routes for user', () => {
  describe('`/api/users/:userId` route handling a GET request', () => {
    it('responds with an object for one user', async () => {
      const res = await fauxios.get(`/api/users/${newUserId}`);
      expect(res.status).toEqual(200);
      expect(Object.keys(res.body)).toEqual(expect.arrayContaining(
        ['userId', 'firstName', 'lastName', 'email', 'imageUrl']
      ));
      expect(res.body).toHaveProperty('userId', newUserId);
      expect(res.body).toMatchObject(newUser);
    });
  });

  describe('`/api/users/:userId` route handling PUT requests', () => {
    it('updates user names', async () => {
      const res = await fauxios
        .put(`/api/users/${newUserId}`)
        .send({ firstName: 'Hugh', lastName: 'Fields' });
      expect(res.status).toEqual(202);
      expect(res.body.firstName).toEqual('Hugh');
      expect(res.body.lastName).toEqual('Fields');
    });
    it('updates user email', async () => {
      const email = 'hcampos@cal.edu'; 
      const res = await fauxios
        .put(`/api/users/${newUserId}`)
        .send({ email });
      expect(res.status).toEqual(202);
      expect(res.body.email).toEqual(email);
    });
    it('updates user imageUrls', async () => {
      const imageUrl = 'https://avatars.dicebear.com/v2/bottts/1.svg'; 
      const res = await fauxios
        .put(`/api/users/${newUserId}`)
        .send({ imageUrl });
      expect(res.status).toEqual(202);
      expect(res.body.imageUrl).toEqual(imageUrl);
    });
    it('prevents updates to userId', async () => {
      const userId = '504c85d7-5dab-4196-99b4-b03a41877359'; 
      const res = await fauxios
        .put(`/api/users/${newUserId}`)
        .send({ userId });
      expect(res.body.userId).not.toBe(userId);
    });
  });

  describe('`/api/users/:userId` route handling DELETE request', () => {
    it('deletes a user from the User table', async () => {
      const res = await fauxios.delete(`/api/users/${newUserId}`);
      expect(res.status).toEqual(204);
      const noUserNoErr = await fauxios.get(`/api/users/${newUserId}`);
      expect(noUserNoErr.status).toEqual(404);
      expect(noUserNoErr.body.userId).toBe(undefined);
    });
  });
});
