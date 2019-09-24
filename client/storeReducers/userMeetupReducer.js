import {
  // UPDATE_MEETUP_DATA,
  GET_USER_MEETUP_DATA,
} from '../actions/actionTypes';

const userMeetupReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_MEETUP_DATA: 
    //TODO: rewrite the routes to avoid this
    //When used with POST to /api/usersessions:
    //If matched, action.payload === {reqUser:{userId:, meetupId:}, partner:}
    //else, action.payload === {}
    //When used with GET to /api/user/:userId/meetups:
    //action.payload === User.meetups[].user_meetup.meetupId||status
    if(action.payload && action.payload.reqUser){
      const {userMeetupId:id, status, userId, userType, meetupId, proficiencyRating} = action.payload.reqUser;
      return {id, userId, userType, status, proficiencyRating, meetupId};
    } else if (action.payload && action.payload.meetups) {
      const {userMeetupId:id, userType, proficiencyRating, status, userId, meetupId} = action.payload.meetups[0].user_meetup;
      return {id, userId, userType, status, proficiencyRating, meetupId};
    } else {
      return state;
    }
    // case UPDATE_MEETUP_DATA:
    //   return { ...state, userMeeupsArray: action.payload.meetups };
    default:
      return state;
  }
};

export default userMeetupReducer;
