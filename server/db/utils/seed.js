const { db, User, Course, Topic, Meetup } = require('../index');
const faker = require('faker');
const path = require('path');
const fs = require('fs');

//Generate Dummy Data
const num = 10;
const emails = {};
let users = Array(num).fill({});

do {
  users = users
    .map(() => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const imageUrl = faker.image.avatar();
      const email = `${firstName}.${lastName}@slo.edu`.toLowerCase();
      const password = 'test';
      let salt = 'test2';
      let interation = 12345678;
      //const weightedAveSoftSkillsRating = 4.2;
      return {
        firstName,
        lastName,
        email,
        imageUrl,
        password,
        salt,
        interation,
        // weightedAveSoftSkillsRating
      };
    })
    .filter(user => {
      if (emails[user.email]) return false;
      else {
        emails[user.email] = true;
        return true;
      }
    });
} while (users.length < num);

const meetups = [
  {
    meetupType: 'M:M',
    location: 'Library',
    matchedAt: new Date(),
    meetupEnded: new Date(),
  },
  {
    meetupType: 'M:M',
    location: 'Library',
    matchedAt: new Date(),
    meetupEnded: new Date(),
  },
  {
    meetupType: 'M:M',
    location: 'Coffee Shop',
    matchedAt: new Date(),
    meetupEnded: new Date(),
  },
  {
    meetupType: 'M:M',
    location: 'Computer Lab',
    matchedAt: new Date(),
    meetupEnded: new Date(),
  },
];

const courses = [
  {
    courseName: 'Intermediate Algebra',
    courseCode: '96',
    syllabusBody:
      'Review of basic algebra skills at the intermediate algebra level intended primarily to prepare students for MATH 116. Not for baccalaureate credit. Credit/No Credit grading only. 3 lectures.',
  },
  {
    courseName: 'Calculus 1',
    courseCode: '141',
    syllabusBody:
      'Limits, continuity, differentiation. Introduction to integration. 4 lectures. Crosslisted as HNRS/MATH 141.',
  },
  {
    courseName: 'Partial Differential Equations',
    courseCode: '419',
    syllabusBody:
      'Evolution of mathematics from earliest to modern times. Major trends in mathematical thought, the interplay of mathematical and technological innovations, and the contributions of great mathematicians. Appropriate for prospective and in-service teachers. 4 lectures.',
  },
];

// Sync to DB then Seed Dummy Data
const seed = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
      console.log('Synced DB.');
      // await User.bulkCreate(users); //BulkCreate threw uniqueness error
      await Promise.all(users.map(user => User.create(user)));
      //Topic seeding
      let src = path.join(__dirname, 'seeds', 'topicSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let topics = JSON.parse(data);
      await Promise.all(topics.map(topic => Topic.create(topic)));
      // Course seeding
      await Promise.all(courses.map(course => Course.create({ ...course })));
      //CourseTopic associations made
      //creates entry with courseId, topicId, courseTopicId - param1: courseCode, param2: topic title
      //CourseTopic.associate('96', 'Limits');
      //Meetup seeding
      await Promise.all(meetups.map(m => Meetup.create(m)));

      // db.close(); //Not closing since some tests don't include after hook to sync db then seed data
      console.log('Seeded DB.');
    } else {
      throw 'Error: Trying to seed in production environment.';
    }
  } catch (error) {
    console.error('Could not seed database:', error);
    db.close();
  }
};

module.exports = seed;

if (require.main === module) {
  seed();
}
