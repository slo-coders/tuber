const { db, User, Course, Meetup, UserMeetup, Topic } = require('../index');
const meetupsData = require('./seedFiles/meetupData');
const coursesData = require('./seedFiles/courseData');
const userMeetUpData = require('./seedFiles/userMeetupData');
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
      //const weightedAveSoftSkillsRating = 4.2;
      return {
        firstName,
        lastName,
        email,
        imageUrl,
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

// Sync to DB then Seed Dummy Data
const seed = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
      console.log('Synced DB.');
      // await User.bulkCreate(users); //BulkCreate threw uniqueness error
      await Promise.all(users.map(user => User.create(user)));

      await Promise.all(meetupsData.map(m => Meetup.create(m)));

      await Promise.all(coursesData.map(course => Course.create(course)));
      console.log('Seeded DB.');

      const usersReturned = await User.findAll();
      const meetupsReturned = await Meetup.findAll();

      await Promise.all(
        usersReturned.map((user, i) =>
          UserMeetup.create({
            userId: usersReturned[i].userId,
            meetupId: meetupsReturned[i % 2].id,
          }),
        ),
      );

      //Topic seeding
      let src = path.join(__dirname, 'seedFiles', 'topicSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let topics = JSON.parse(data);
      await Promise.all(topics.map(topic => Topic.create(topic)));
      // Course seeding

      //CourseTopic associations made
      //creates entry with courseId, topicId, courseTopicId - param1: courseCode, param2: topic title
      //CourseTopic.associate('96', 'Limits');
      //Meetup seeding

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
