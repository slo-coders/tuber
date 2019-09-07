const User = require('./User');
const Course = require('./Course');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

module.exports = {
  User,
  Course,
};
