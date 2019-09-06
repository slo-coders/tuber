const { db, User, Course, Assignment } = require('../index');
const faker = require('faker');
const path = require('path');
const fs = require('fs');
const num = 10;

const emails = {};

const users = Array(num).fill({})
  .map(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const imageUrl = faker.image.avatar();
    const email = (`${firstName}.${lastName}@slo.edu`).toLowerCase();
    //const weightedAveSoftSkillsRating = 4.2;
    return {
      firstName,
      lastName,
      email,
      imageUrl
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

const courses = [{ courseName: "Intermediate Algebra", courseCode: "96", syllabusBody: "Review of basic algebra skills at the intermediate algebra level intended primarily to prepare students for MATH 116. Not for baccalaureate credit. Credit/No Credit grading only. 3 lectures." }, { courseName: "Calculus 1", courseCode: '141', syllabusBody: "Limits, continuity, differentiation. Introduction to integration. 4 lectures. Crosslisted as HNRS/MATH 141." }, { courseName: "Partial Differential Equations", courseCode: "419", syllabusBody: "Evolution of mathematics from earliest to modern times. Major trends in mathematical thought, the interplay of mathematical and technological innovations, and the contributions of great mathematicians. Appropriate for prospective and in-service teachers. 4 lectures." }];


// Sync to DB then Seed Dummy Data
const seed = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      await db.sync({ force: true });
      console.log('Synced DB.');
      // await User.bulkCreate(users); //BulkCreate threw uniqueness error
      await Promise.all(users.map(user => User.create(user)));
      //Assignment seeding
      let src = path.join(__dirname, 'seeds', 'assignmentSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let assignments = JSON.parse(data);
      //BROKEN
      console.log(Assignment);
      //await Promise.all(assignments.map(assignment => Assignment.create(assignment)));


      await Promise.all(courses.map(course => Course.create({ ...course })));
      console.log('Seeded DB.');
    }
    else {
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
