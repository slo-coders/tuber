const {db, User, Assignment} = require('../index');
const faker = require('faker');
const path = require('path');
const fs = require('fs');
const num = 10;

const emails = {};

const users = Array(num).fill({})
  .map(() => {
    const firstName = faker.name.firstName();
    const lastName  = faker.name.lastName();
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
    if(emails[user.email]) return false;
    else {
      emails[user.email] = true;
      return true;
    }
  });

// Sync to DB then Seed Dummy Data
const seed = async () => {
  try {
    if(process.env.NODE_ENV !== 'production') {
      await db.sync({force: true});
      console.log('Synced DB.');
      // await User.bulkCreate(users); //BulkCreate threw uniqueness error
      await Promise.all(users.map(user => User.create(user)));
      console.log('Seeded DB.');
      //Assignment seeding
      let src = path.join(__dirname, 'seeds', 'assignmentSeed.json');
      let data = fs.readFileSync(src, 'utf8');
      let assignments = JSON.parse(data);
      //BROKEN
      //await Promise.all(assignments.map(assignment => Assignment.create(assignment)));
    }
    else{
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
