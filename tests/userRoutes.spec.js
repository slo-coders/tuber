const { db, UserMeetup } = require('../server/db/index');
// const seed = require('../server/db/utils/seed');
const { app } = require('../server/server'); //does not start server
const request = require('supertest'); //client
// const { verifyPassword } = require('../server/db/utils/hash');

const fauxios = request(app); //supertest both ports and makes HTTP requests to app

const newUser = {
  firstName: 'Hugo',
  lastName: 'Campos',
  email: 'contacthugocampos@gmail.com', //needs to be unique relative to other test-created users
  imageUrl: 'https://avatars.dicebear.com/v2/bottts/012.svg',
  password: 'test',
};

const userWithoutPassword = {};
Object.keys(newUser).forEach(key => {
  if (key !== 'password') userWithoutPassword[key] = newUser[key];
});

let newUserId;

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.close();
  console.log('DB closed.');
});

//Tests
describe('Routes for all users', () => {
  describe('`/api/users` route handling a GET request', () => {
    it('responds with an array of all available users', async () => {
      const res = await fauxios.get('/api/users');
      expect(res.status).toEqual(200);
      expect(res.body.length).toBeGreaterThan(9);
      expect(Object.keys(res.body[0])).toEqual(
        expect.arrayContaining([
          'id',
          'firstName',
          'lastName',
          'email',
          'imageUrl',
        ]),
      );
      expect(res.body.password).toBe(undefined);
    });
  });

  describe('`/api/users` route handling a POST request', () => {
    it('responds with new user instance with an id', async () => {
      const res = await fauxios.post('/api/users').send(newUser);
      newUserId = res.body.id;
      expect(res.status).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toMatchObject(userWithoutPassword);
      expect(res.body.password).not.toBe(newUser.password);
    });
  });
});

describe('Routes for a single user', () => {
  describe('`/api/users/:userId` route handling a GET request', () => {
    it('responds with an object for one user', async () => {
      const res = await fauxios.get(`/api/users/${newUserId}`);
      // console.log('RES', res.body);
      expect(res.status).toEqual(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining([
          'id',
          'firstName',
          'lastName',
          'email',
          'imageUrl',
        ]),
      );
      expect(res.body).toMatchObject(userWithoutPassword);
      expect(res.body).toHaveProperty('id', newUserId);
      /* expect(
        verifyPassword(newUser.password, res.body.password, res.body.salt),
        ).toEqual(true); */
      expect(res.body.password).toBe(undefined);
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
      const res = await fauxios.put(`/api/users/${newUserId}`).send({ email });
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
    it("prevents updates to user's id", async () => {
      const userId = '504c85d7-5dab-4196-99b4-b03a41877359';
      const res = await fauxios.put(`/api/users/${newUserId}`).send({ userId });
      expect(res.body.id).not.toBe(userId);
    });
  });

  describe('`/api/users/:userId` route handling DELETE request', () => {
    it('deletes a user from the User table', async () => {
      const res = await fauxios.delete(`/api/users/${newUserId}`);
      expect(res.status).toEqual(204);
      const noUserNoErr = await fauxios.get(`/api/users/${newUserId}`);
      expect(noUserNoErr.status).toEqual(404);
      expect(noUserNoErr.body.id).toBe(undefined);
    });
  });
});

describe('`/api/users/:userId/meetups` route which returns dataset meetup and user-meetup information for a particular single user', () => {
  xit('returns a user with a meetups property', async () => {
    const users = await UserMeetup.findAll();
    const response = await request(app).get(
      `/api/users/${users[0].userId}/meetups`,
    );
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('meetups');
  });
});

// test is obsolete, route no long exists
// describe('`/api/users/:userId/meetups/:meetupId` route returns an array of users for a user-meetup', () => {
//   it('fetches user-meetup info based on a specific user ID', async () => {
//     const users = await UserMeetup.findAll();
//     const response = await request(app).get(
//       `/api/users/${users[0].id}/meetups/${users[0].meetupId}`,
//     );
//     expect(response.status).toEqual(200);
//     expect(response.body.length).toEqual(2);
//     expect(response.body[0]).toHaveProperty('userMeetupId');
//     expect(response.body[1]).toHaveProperty('proficiencyRating');
//   });
// });

describe('`/api/users/:userId/meetups/:meetupId` route to handle PUT request to update user status', () => {
  xit('updates user and partner info', async () => {
    const users = await UserMeetup.findAll();

    const req = {
      body: {
        userType: 'mentor',
        softSkillsRating: '200',
        proficiencyRating: '400',
        comments: 'worked on some homework stuff',
      },
    };

    const response = await request(app)
      .put(`/api/users/${users[0].userId}/meetups/${users[0].meetupId}`)
      .send(
        // await UserMeetup.updateUserMeetup(
        await UserMeetup.updatePartnerUserMeetup(
          users[0].userId,
          users[0].meetupId,
          req,
        ),
      );
    expect(response.status).toEqual(200);
    //expect(response.body.length).toEqual(2);
    //expect(response.body[1].userType).toBe('mentor');
    //expect(response.body[0].softSkillsRating).not.toBe(null);
  });
});
