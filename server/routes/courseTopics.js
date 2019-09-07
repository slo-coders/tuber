const router = require('express').Router();
const { CourseTopic } = require('../db/index.js');

router.get('/', async (req, res, next) => {
  try {
    res.send(await CourseTopic.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
