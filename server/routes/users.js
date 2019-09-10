const express = require('express');
const router = express.Router();

// Model
const { User, UserMeetup, Meetup } = require('../db/index');

// Routes
// `/api/users/:userId/topics/:topicId?`
router.all('/:userId/topics', require('./userTopics'));

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
      const newUser = await User.createNew(req.body);
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
      const user = await User.scope('withoutPassword').findByPk(
        req.params.userId,
      );
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

router.get('/:userId/userMeetup', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      include: [{ model: Meetup, through: { model: UserMeetup } }],
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/userMeetup/:meetupId', async (req, res, next) => {
  try {
    const userMeetup = await UserMeetup.findAll({
      where: { meetupId: req.params.meetupId },
    });
    res.send(userMeetup);
  } catch (err) {
    next(err);
  }
});

router.put('/:userId/userMeetup/:meetupId', async (req, res, next) => {
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
