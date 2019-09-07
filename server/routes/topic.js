const router = require('express').Router();
const { Topic } = require('../db/index.js');

//WIP not hooked up yet . . . i think

router.get('/', async (req, res, next) => {
  try {
    res.send(await Topic.findAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.send(
      await Topic.findOne({
        where: {
          id: req.body.id,
        },
      }),
    );
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newTopic = await Topic.create({
      title: req.body.title,
      description: req.body.description,
      dueDateRequired: req.body.dueDateRequired,
      dueAt: req.body.dueAt,
      htmlURL: req.body.htmlURL,
      courseID: req.body.courseID,
    });
    res.status(201).send(newTopic);
  } catch (err) {
    next(err);
  }
});

//WIP saving to move local
/*
router.put('/:id', async (req, res, next) => {
  try {
    Topic.update(
      {title: req.body.title},
      {description: req.body.description},
      {dueDateRequired: req.body.dueDateRequired},
      {dueAt: req.body.dueAt},
      {htmlURL: req.body.htmlURL},
      {courseID: req.body.courseID},
      {where: {id: req.body.id}}
    );
  } catch (err) {
    next(err);
  }
});
*/
