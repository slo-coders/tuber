const User = require('./User');
const Assignment = require('./Assignment');
const Course = require('./Course');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

module.exports = {
  User,
  Assignment,
  Course
};
