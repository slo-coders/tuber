const express = require('express');
const router = express.Router();

// Model
const { User, UserMeetup, Meetup, UserTopic, Topic } = require('../db/index');

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
    const updatedUserMeetup = await UserMeetup.updateUserMeetup(
      req.params.userId,
      req.params.meetupId,
      req,
    );
    res.send(updatedUserMeetup);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
