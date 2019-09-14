const router = require('express').Router();
const { Course, CourseTopic } = require('../db/index.js');

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

router.post('/', async (req, res, next) => {
  try {
    const newCourse = await Course.create({
      courseName: req.body.courseName,
      courseCode: req.body.courseCode,
      syllabusBody: req.body.syllabusBody,
    });
    res.status(201).send(newCourse);
  } catch (err) {
    next(err);
  }
});

router.put('/:courseId', async (req, res, next) => {
  try {
    const courseUpdate = await Course.findByPk(req.params.courseId);
    courseUpdate.update({
      courseName: req.body.courseName,
      courseCode: req.body.courseCode,
      syllabusBody: req.body.syllabusBody,
    });
    res.send(courseUpdate);
  } catch (err) {
    next(err);
  }
});

router.delete('/:courseId', async (req, res, next) => {
  try {
    await Course.destroy({ where: { id: req.params.courseId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//Return all topics in a course
router.get('/:courseId/topics', async (req, res, next) => {
  try {
    const topicsForCourse = await CourseTopic.findAll({
      where: { courseId: req.params.courseId },
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
