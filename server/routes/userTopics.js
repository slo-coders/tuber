const express = require('express');
const router = express.Router();

// Model
const { UserTopic } = require('../db/index');

// Routes
//`/api/users/:userId/topics
router
  .route('/:userId/topics')
  .get(async (req, res, next) => {
    try {
      const userTopics = await UserTopic.findAll({
        where: { userId: req.params.userId },
      });

      if (userTopics) {
        res.send(userTopics);
      } else {
        res.status(404).end();
      }
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const arrOfUserTopics = req.body;
      const newUserTopicsArr = await UserTopic.createArr(
        req.params.userId,
        arrOfUserTopics,
      );
      res.status(201).send(newUserTopicsArr);
    } catch (err) {
      next(err);
    }
  });

//`/api/users/:userId/topics/:topicId
router
  .route('/:userId/topics/:topicId')
  .put(async (req, res, next) => {
    try {
      const updatedUserTopic = await UserTopic.updateInfo(
        req.params.userId,
        req.body,
      );
      res.status(202).send(updatedUserTopic);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await UserTopic.remove(req.params.userId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
