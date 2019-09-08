const router = require('express').Router();

/* Callback's paramater in `authorized` is array of two middleware functions
(second of which is router middleware). If the first middleware function finds
that req.session has a user with `userId`, then the second middleware function
will route to a specified/required `routePath` because next() was called,
otherwise the first middleware function response with a 401 status.
*/

//use `authorized` middleware if sessions are setup
// const authorized = routePath => [(req, res, next) => req.session.userId
//   ? next() : res.status(401).end(), require(routePath)]

// router.use('/sessions', require('./sessions')); //use if sessions are setup

// router.use('/users', authorized('./users')); //use if sessions are setup
router.use('/users', require('./users')); //use if sessions are NOT setup
// router.use('/courses', authorized('./course')); //use if sessions are setup
router.use('/courses', require('./courses')); //use if session are NOT setup
router.use('/courseTopics', require('./courseTopics')); //use if session are NOT setup
router.use('/topics', require('./topics'));


module.exports = router;
