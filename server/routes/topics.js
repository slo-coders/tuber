const router = require('express').Router();
const { Topic } = require('../db/index.js');

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
          id: req.params.id,
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
    res.status(201);
    res.send(newTopic);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const targetTopic = await Topic.findByPk(req.params.id);
    await targetTopic.update({
      title: req.body.title,
      description: req.body.description,
      dueDateRequired: req.body.dueDateRequired,
      dueAt: req.body.dueAt,
      htmlURL: req.body.htmlURL,
    });
    res.status(200).send(targetTopic);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Topic.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
