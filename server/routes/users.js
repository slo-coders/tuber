const express = require('express');
const router = express.Router();

// Model
const {
  User,
  UserMeetup,
  Meetup,
  UserTopic,
  Topic,
  MeetupTopic,
} = require('../db/index');

// Routes
// `/api/users/:userId/topics/:topicId?`
const passUserId = (req, res, next) => {
  console.log('req.params', req.params);
  if (req.params.userId === "undefined") {
    res.end();
  } else {
    req.userId = req.params.userId;
    next();
  }
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
  });


//Gets all most recent meetup data for a user
router.get('/:userId/meetups', async (req, res, next) => {
  try {
    const user = await User.scope('withoutPassword').findOne({
      where: { id: req.params.userId },
      include: [
        {
          model: Meetup,
          attributes: ['id'],
          through: {
            model: UserMeetup,
          },
        }, //status
        { model: Topic, through: { model: UserTopic } }, //topic
      ],
      order: [[Meetup, UserMeetup, 'createdAt', 'DESC']], //Order by most recent UserMeetup
      limit: 1,
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

/* TODO: route for updating a user's partner UserMeetup should probably be:
 `/users/:partnerId/meetups/:meetupId` not `/users/:userId/meetups/:meetupId`
 */
router.put('/:userId/meetups/:meetupId', async (req, res, next) => {
  try {
    //User submits req.body = {proficiencyRating:, status:} with PUT to get UserMeetup instances for both themeselves and partner
    const newPartnerInfo = req.body;
    const newPartnerProfRating = req.body.proficiencyRating;

    // console.log('received axios req with body: ', newPartnerInfo);

    const userMeetupUpdate = await UserMeetup.updatePartnerUserMeetup(
      req.params.userId,
      req.params.meetupId,
      newPartnerInfo,
    );

    const { partnerMeetupInfo } = userMeetupUpdate; // {partnerMeetupInfo:,personalMeetupInfo:};

    if (newPartnerProfRating && partnerMeetupInfo.proficiencyRating) {
      //GET the meetup's topicId
      const meetup = await Meetup.findOne({
        where: { id: req.params.meetupId },
        include: [{ model: Topic, through: { model: MeetupTopic } }],
      });

      const topicId = meetup.topics[0].id;

      //GET the partner's previous running average
      const prevRunningAveTopicProfeciency = (await UserTopic.findOne({
        where: {
          userId: partnerMeetupInfo.userId,
          topicId,
        },
      })).proficiencyRating;

      //Set an alpha for an estimated exponenial moving average
      const alpha = 0.1;

      //Calculate new running average
      const newAveProfRating = Math.round(
        alpha * newPartnerProfRating +
        (1 - alpha) * prevRunningAveTopicProfeciency,
      );

      //Update newAveProfRating in UserTopic table
      await UserTopic.update(
        {
          proficiencyRating: newAveProfRating,
        },
        {
          where: {
            userId: partnerMeetupInfo.userId,
            topicId,
          },
        },
      );
    } else {
      console.log('NO previous average rating or new rating provided.');
    }
    res.send(userMeetupUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
