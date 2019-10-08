const router = require('express').Router();
const { Course, Topic, CourseTopic } = require('../db/index.js');

router.get('/', async (req, res, next) => {
  try {
    res.send(await Course.findAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:courseId', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    res.send(course);
  } catch (err) {
    next(err);
  }
});


//Return all topics in a course
router.get('/:courseId/topics', async (req, res, next) => {
  try {
    const topicsForCourse = await Course.findOne({
      where: { id: req.params.courseId },
      include: [{ model: Topic, attributes: ['title', 'id'] }],
    });
    res.send(topicsForCourse);
  } catch (err) {
    next(err);
  }
});

//make a new course and topic association
router.post('/:courseId/topics/:topicId', async (req, res, next) => {
  try {
    const newCourseTopic = await CourseTopic.create({
      courseId: req.params.courseId,
      topicId: req.params.topicId,
    });
    res.status(201).send(newCourseTopic);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
