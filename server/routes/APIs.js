const router = require('express').Router();
const { User } = require('../db/index');

const checkUser = async (req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    try {
      if (req.session && req.session.userId) {
        const sessionUser = await User.scope('withoutPassword').findOne({
          where: {
            id: req.session.userId,
          },
        });
        if (!sessionUser) {
          res.send('Please try again');
        }
        next();
      } else {
        res.sendStatus(401);
        next();
      }
    } catch (err) {
      next(err);
    }
  }
};

router.all(checkUser); //check if this protects all routes
router.use('/users', require('./users'));
router.use('/courses', require('./courses'));
router.use('/topics', require('./topics'));
router.use('/usersessions', require('./usersessions'));
router.use('/meetups', require('./meetups'));

module.exports = router;
