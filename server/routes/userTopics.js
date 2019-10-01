const express = require('express');
// const Sequelize = require('sequelize');
const router = express.Router();

// Model
const { UserTopic, Topic } = require('../db/index');

// Routes
//`/api/users/:userId/topics
router
  .route('/') //NOTE: req.params does not include userId here w/ req.uesrId
  .get(async (req, res, next) => {
    try {
      const userTopics = await UserTopic.findAll({
        where: { userId: req.userId },
      });

      const topicNames = await Promise.all(
        userTopics.map(uTop =>
          Topic.findOne({
            where: { id: uTop.topicId },
          }),
        ),
      );

      const returnObj = userTopics.map((uTop, i) => ({
        topicName: topicNames[i].title,
        topicId: uTop.topicId,
        proficiencyRating: uTop.proficiencyRating,
      }));

      if (returnObj) {
        res.send(returnObj);
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
      const updatedUserTopic = await UserTopic.updateInfo({
        userId: req.userId,
        topicId: req.params.topicId,
        proficiencyRating: req.body.proficiencyRating,
      });
      res.status(202).send(updatedUserTopic);
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
