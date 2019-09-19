const {
  db,
  User,
  Course,
  CourseTopic,
  Topic,
  UserTopic,
  Meetup,
  // UserMeetup,
  MeetupTopic,
  UserSession,
} = require('../index');
const users = require('./seedFiles/userData');
const randIntBtwn = require('./randIntBtwn');
const meetupsData = require('./seedFiles/meetupData');
const coursesData = require('./seedFiles/courseData');
// const userMeetUpData = require('./seedFiles/userMeetupData');
// const userSessionData = require('./seedFiles/userSessionData');
const path = require('path');
const fs = require('fs');
// const uuid = require('./uuid');

// Sync to DB then Seed Dummy Data
const seed = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
      console.log('Synced DB.');

      //SEED MAIN TABLES

      //Seed User
      // await User.bulkCreate(users); //BulkCreate threw uniqueness error
      await Promise.all(users.map(user => User.create(user)));

      //Seed Courses
      await Promise.all(coursesData.map(course => Course.create(course)));

      //Seed Topic
      let src = path.join(__dirname, 'seedFiles', 'topicSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let topics = JSON.parse(data);
      await Promise.all(topics.map(topic => Topic.create(topic)));

      //Seed Meetup
      await Promise.all(meetupsData.map(m => Meetup.create(m)));

      //return intances of main tables
      const usersReturned = await User.findAll();
      const meetupsReturned = await Meetup.findAll();
      const topicsReturned = await Topic.findAll();
      const courseReturned = await Course.findAll();

      // Seed CourseTopic
      await Promise.all(
        topicsReturned.map(topic =>
          CourseTopic.create({
            courseId: courseReturned[randIntBtwn(0, 2)].id,
            topicId: topic.id,
          }),
        ),
      );

      //Seed UserTopic
      usersReturned.forEach(async user => {
        const start = randIntBtwn(0, topicsReturned.length - 2);
        const end = randIntBtwn(start + 1, topicsReturned.length);
        const ratedTopics = topicsReturned.slice(start, end).map(topic => ({
          userId: user.id,
          topicId: topic.id,
          proficiencyRating: randIntBtwn(0, 500),
        }));
        await Promise.all(ratedTopics.map(uTop => UserTopic.create(uTop)));
      });

      //Seed MeetupTopic
      await Promise.all(
        meetupsReturned.map((meet, i) =>
          MeetupTopic.create({
            meetupId: meet.id,
            topicId: topicsReturned[i].id,
          }),
        ),
      );

      const userTopicsReturned = await UserTopic.findAll();

      // Seed UserSession (Users should have a UserTopic rating so create UserSessions from UserTopics)
      // let userSessionReturned = await Promise.all(
      await Promise.all(
        usersReturned.map((user, i) => 
          //Create userSession
          UserSession.create({
            userType: ['mentee', 'mentor', 'peer'][i % 3],
            location: ['library', 'computer lab', 'cafe', 'dorm lounge'][i % 4],
            selectedTopics:
            ['mentee', 'mentor', 'peer'][i % 3] === 'mentor'
                ? userTopicsReturned
                .filter(uTopInst => uTopInst.userId === user.id)
                .map(uTopInst => uTopInst.topicId)
                : userTopicsReturned
                .filter(uTopInst => uTopInst.userId === user.id)
                .map(uTopInst => uTopInst.topicId)
                .slice(0, 1),
                userId: user.id,
          })
        )
      );
            
/*       // Updated user with userSessionId
      await Promise.all(
        usersReturned.map((user, i) => 
          user.update({
            userSessionId: userSessionReturned[i].id
          })
        )
      ); */
      
      console.log('Seeded DB.');
    } else {
      throw 'Error: Trying to seed in production environment.';
    }
  } catch (error) {
    console.error('Could not seed database: ', error);
  }
  // await db.close();
};

module.exports = seed;

if (require.main === module) {
  seed();
}
