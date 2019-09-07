const router = require('express').Router();
const { Course } = require('../db/index.js');

router.get('/', async (req, res, next) => {
  try {
    res.send(await Course.findAll());
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    res.send(course);
  } catch (e) {
    next(e);
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
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const courseUpdate = await Course.findByPk(req.params.id);
    courseUpdate.update({
      courseName: req.body.courseName,
      courseCode: req.body.courseCode,
      syllabusBody: req.body.syllabusBody,
    });
    res.send(courseUpdate);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Course.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
