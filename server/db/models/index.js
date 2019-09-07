const User = require('./User');
const Topic = require('./Topic');
const Course = require('./Course');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);
Course.hasOne(Topic);


module.exports = {
  User,
  Topic,
  Course
};
