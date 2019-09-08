const User = require('./User');
const Course = require('./Course');
const UserMeetup = require('./UserMeetup');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

User.belongsToMany(Meetup, {
  through: UserMeetup,
  foreignKey: 'userId',
  otherKey: 'MeetupId',
});

Meetup.belongsToMany(User, {
  through: UserMeetup,
  foreignKey: 'MeetupId',
  otherKey: 'UserId',
});

module.exports = {
  User,
  Course,
  UserMeetup,
};
