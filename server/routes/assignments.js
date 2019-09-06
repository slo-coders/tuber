const router = require('express').Router();
const { Assignment } = require('../db/index.js');

router.get('/', async (req, res, next) => {
  try{
    res.send(await Assignment.findAll());
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newAssignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description,
      dueDateRequired: req.body.dueDateRequired,
      dueAt: req.body.dueAt,
      htmlURL: req.body.htmlURL,
      courseID: req.body.courseID
    });
    res.status(201).send(newAssignment);
  } catch (err) {
    next(err);
  }
});

//WIP saving to move local
// router.put('/:id', async (req, res, next) => {
//   try {
//     const assignment = await Assignment.findOne({
//       where: {
//         id: req.params.id,
//       }
//     });
//     Assignment.update
//   } catch (err) {
//     next(err);
//   }
// });
