const router = require('express').Router();
const { CourseTopic } = require('../db/index.js');

router.get('/', async (req, res, next) => {
  try {
    res.send(await CourseTopic.findAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const courseTopic = await CourseTopic.findByPk(req.params.id);
    res.send(courseTopic);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCourseTopic = await CourseTopic.associate('96', 'Limits');
    res.status(201).send(newCourseTopic);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
