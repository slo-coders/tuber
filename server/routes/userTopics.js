const express = require('express');
const router = express.Router();

// Model
const { UserTopic } = require('../db/index');

// Routes
//`/api/users/:userId/topics
router
  .route('/') //NOTE: req.params does not include userId here w/ req.uesrId
  .get(async (req, res, next) => {
    try {
      const userTopics = await UserTopic.findAll({
        where: { userId: req.userId },
      });
      if (userTopics) {
        res.send(userTopics);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const arrOfUserTopics = req.body;
      const newUserTopicsArr = await UserTopic.createArr(
        req.userId,
        arrOfUserTopics,
      );
      res.status(201).send(newUserTopicsArr);
    } catch (err) {
      next(err);
    }
  });

//`/api/users/:userId/topics/:topicId
router
  .route('/:topicId') //NOTE: req.params nly inlcudes :topicId not userId
  /*   .get(async (req, res, next) => {
    try {
      const userTopic = await UserTopic.findOne({
        where: { 
          userId: req.userId,
          topicId: req.params.topicId
        }
      }); 
      res.send(userTopic);
    }
    catch (err) {
      next(err);
    }
  }) */
  .put(async (req, res, next) => {
    try {
      console.log('req.body in PUT >>> ', req.body);
      const updatedUserTopic = await UserTopic.updateInfo({
        userId: req.userId,
        topicId: req.params.topicId,
        proficiencyRating: req.body.proficiencyRating,
      });
      res.status(202).send(updatedUserTopic);
    } catch (err) {
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await UserTopic.destroy({
        where: {
          userId: req.userId,
          topicId: req.params.topicId,
        },
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
