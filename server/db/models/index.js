const User = require('./User');
const Course = require('./Course');
// const UserMeetup = require('./UserMeetup');
const Meetup = require('./Meetup');
const UserMeetup = require('./UserMeetup');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

User.belongsToMany(Meetup, {
  through: UserMeetup,
  foreignKey: 'userId',
  otherKey: 'meetupId',
});

Meetup.belongsToMany(User, {
  through: UserMeetup,
  foreignKey: 'meetupId',
  otherKey: 'userId',
});

module.exports = {
  User,
  Course,
  Meetup,
  UserMeetup,
};
