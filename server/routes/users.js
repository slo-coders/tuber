const express = require('express');
const router = express.Router();

// Model
const {
  User,
  // UserSession,
  UserMeetup,
  Meetup,
  UserTopic,
  Topic,
  MeetupTopic,
} = require('../db/index');

// Routes
// `/api/users/:userId/topics/:topicId?`
const passUserId = (req, _res, next) => {
  req.userId = req.params.userId;
  next();
};
router.use('/:userId/topics', passUserId, require('./userTopics'));

//`/api/users`
router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.send(await User.scope('withoutPassword').findAll());
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await User.scope('withoutPassword').createNew(req.body);
      res.status(201).send(newUser);
    } catch (err) {
      next(err);
    }
  });

//`/api/users/:userId`
router
  .route('/:userId')
  .get(async (req, res, next) => {
    try {
      const user = await User.scope('withoutPassword').findOne({
        where: { id: req.params.userId },
        include: [
          { model: Meetup, through: { model: UserMeetup } },
          { model: Topic, through: { model: UserTopic } },
        ],
      });
      if (user) {
        res.send(user);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedUser = await User.updateInfo(req.params.userId, req.body);
      res.status(202).send(updatedUser);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await User.remove(req.params.userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
//Gets all meetupinformation for a user.
router.get('/:userId/meetups', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      include: [
        { model: Meetup, through: { model: UserMeetup } }, //status
        { model: Topic, through: { model: UserTopic } }, //topic
      ],
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:userId/meetups/:meetupId', async (req, res, next) => {
  try {
    //first user submits req {proficiencyRating: , ...rest} with PUT to /:userId/meetups/:meetupId
    const userMeetupUpdate = await UserMeetup.updateUserMeetup(
      req.params.userId,
      req.params.meetupId,
      req,
    );
    //this route returns meetup array of users, which has both user's info and partner's info
    const partner = userMeetupUpdate.filter(
      user => user.userId !== req.params.userId,
    )[0];
    console.log('partner: ', partner);
    console.log('req.params.meetupId: ', req.params.meetupId);
    const topicId = await UserMeetup.findOne({
      where: { meetupId: req.params.meetupId },
      includes: [{ model: Topic, through: { model: MeetupTopic } }],
    }); //.topics[0].id; //due to associations, topics is a property in UserMeetup
    console.log('topicId: ', topicId);

    //can get topidIc w/ meetupId

    //UserSession -> topidId = UserMeetup.topics[0].id -> UserTopic.profeciency
    // const findTopicFromUserSession = await UserSession.findOne({
    //   where: {
    //     userId: partner.userId,
    //   },
    // });

    // //updated partner profeciency info
    // const meetupInfo = await User.findOne({
    //   where: { id: partner.userId },
    //   include: [
    //     { model: Meetup, through: { model: UserMeetup } }, //status
    //     { model: Topic, through: { model: UserTopic } }, //topic
    //   ],
    // });

    // const runningTopicProfeciency = await UserMeetup.findAll({
    //   where: {
    //     id: partner.userId,
    //     topicId: topicId,
    //   },
    //   includes: { model: UserMeetup },
    // });

    //request past 29 proficiency ratings from /api/users/${partnerId}/meetups (i.e., UserMeetups.getMostRecent model class method)
    /*
    const mostRecentProficiencyRatings = meetupInfo.topics
      .sort((topicA, topicB) => topicA.updatedAt > topicB.updatedAt) //check sort method
      .slice(0, 30)
      .map(topic => topic.user_topic.proficiencyRating); //check user_topic or user_topics in res
*/
    //calculate average for user with new proficiencyRating:
    //// const newProficiencyRating = 0.1*(partner.proficiencyRating) + 0.9*(user.proficiencyRating + UserMeetups.getMostRecent().reduce((a,b) => a + b, 0))
    //PUT newProficiencyRating into /api/user/${partenerBeingRated.id}/topics/:topicId (i.e., UserTopic model)
    res.send(userMeetupUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
