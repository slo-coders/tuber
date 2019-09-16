const faker = require('faker');

//Generate Dummy User Data
const num = 100;
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
      let salt;
      //const weightedAveSoftSkillsRating = 4.2;
      return {
        firstName,
        lastName,
        email,
        imageUrl,
        password,
        salt,
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

module.exports = users;
