const {
  db,
  User,
  Course,
  Topic,
  UserTopic,
  Meetup,
  UserMeetup,
} = require('../index');
const users = require('./seedFiles/userData');
const randIntBtwn = require('./randIntBtwn');
const meetupsData = require('./seedFiles/meetupData');
const coursesData = require('./seedFiles/courseData');
const userMeetUpData = require('./seedFiles/userMeetupData');
const path = require('path');
const fs = require('fs');

let usersReturned;

// Sync to DB then Seed Dummy Data
const seed = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
      console.log('Synced DB.');

      //Seed User
      // await User.bulkCreate(users); //BulkCreate threw uniqueness error
      await Promise.all(users.map(user => User.create(user)));
      usersReturned = await User.findAll();

      //Seed Course
      await Promise.all(coursesData.map(course => Course.create(course)));

      //Seed Topic
      let src = path.join(__dirname, 'seedFiles', 'topicSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let topics = JSON.parse(data);
      await Promise.all(topics.map(topic => Topic.create(topic)));
      //CourseTopic associations made
      //creates entry with courseId, topicId, courseTopicId - param1: courseCode, param2: topic title
      //CourseTopic.associate('96', 'Limits');
      const topicsReturned = await Topic.findAll();

      //Seed UserTopic
      usersReturned.forEach(async user => {
        const start = randIntBtwn(0, topicsReturned.length - 1);
        const end = randIntBtwn(start, topicsReturned.length + 1);
        const ratedTopics = topicsReturned.slice(start, end).map(topic => ({
          userId: user.id,
          topicId: topic.id,
          proficiencyRating: randIntBtwn(0, 500),
        }));
        await Promise.all(ratedTopics.map(uTop => UserTopic.create(uTop)));
      });

      //Seed Meetup
      await Promise.all(meetupsData.map(m => Meetup.create(m)));
      const meetupsReturned = await Meetup.findAll();

      //Seed UserMeetup
      await Promise.all(
        userMeetUpData.map((user, i) =>
          UserMeetup.create({
            meetupType: user.userType,
            softSkillsRating: user.softSkillsRating,
            userType: user.userType,
            proficiencyRating: user.proficiencyRating,
            userId: usersReturned[i].id,
            meetupId: meetupsReturned[i % 2].id,
            comments: user.comments,
          }),
        ),
      );

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
