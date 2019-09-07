const User = require('./User');
const Topic = require('./Topic');
const Course = require('./Course');
const CourseTopic = require('./CourseTopic');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);


module.exports = {
  User,
  Topic,
  Course,
  CourseTopic
};
