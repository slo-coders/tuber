const { db, Course, CourseTopic, Topic } = require('../index');

const randIntBtwn = require('./randIntBtwn');
const coursesData = require('./seedFiles/courseData');

const path = require('path');
const fs = require('fs');

const seedHeroku = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
      console.log('Synced DB.');

      //SEED MAIN TABLES

      //Seed Courses
      await Promise.all(coursesData.map(course => Course.create(course)));

      //Seed Topic
      let src = path.join(__dirname, 'seedFiles', 'topicSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let topics = JSON.parse(data);
      await Promise.all(topics.map(topic => Topic.create(topic)));

      //return intances of main tables
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
      console.log('Seeded DB.');
    } else {
      throw 'Error: Trying to seed in production environment.';
    }
  } catch (error) {
    console.error('Could not seed database: ', error);
  }
  await db.close();
};

module.exports = seedHeroku;

if (require.main === module) {
  seedHeroku();
}
