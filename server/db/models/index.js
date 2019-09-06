const User = require('./User');
const Assignment = require('./Assignment');

//Associations
//User.hasMany(UserMeeting);
//UserMeeting.belongsTo(User);
//Meeting.hasMany(UserMeeting);
//UserMeeting.belonsTo(Meeting);

module.exports = {
  User,
  Assignment
};
