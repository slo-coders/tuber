const profRatingMovingAve = (
  newProfRating,
  recentUserMeetupProfRatings, 
  initProficiencyRating = 0,
  ) => {
    //include the UserTopic proficiencyRating as the least important/oldest proficiencyRating
    //to the most recent proficiencyRatings for userMeetups (if fewer that n ratings exist)
    const n = 15;

    let arrOfRatings;
    if(recentUserMeetupProfRatings.length < n){
      arrOfRatings = [initProficiencyRating, ...recentUserMeetupProfRatings, newProfRating];
    }
    else {
      arrOfRatings = [...recentUserMeetupProfRatings, newProfRating];
    }
    
    let alpha = 2/(arrOfRatings.length + 1);
    return arrOfRatings.reduce(
      // returns an estimate for the exponential moving mean for the most recent ratings
      (estimatedExpMovingAve, rating) => alpha*rating + (1 - alpha)*estimatedExpMovingAve, arrOfRatings[0]);
  };

module.exports = profRatingMovingAve;


/* console.log(profRatingMovingAve(400, [0, 100, 100, 200, 300, 200, 100, 100, 300, 400], 200));
console.log(profRatingMovingAve(400, [0, 100, 100, 200, 300, 200, 100, 100, 100, 500], 200));
console.log(profRatingMovingAve(500, [0, 0, 100, 200, 300, 200, 100, 500, 100, 100], 500));
console.log(profRatingMovingAve(200, [500, 500, 500, 200, 300, 500, 100, 500, 500, 100, 0, 0], 500));
console.log(profRatingMovingAve(200, [0, 100, 100, 200, 300, 200, 500, 500, 100, 100, 500, 500], 500)); */
