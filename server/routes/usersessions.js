const router = require('express').Router();
const { Session, UserSession } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    //returns active sessions filtered by userType
    const activeUsers = await UserSession.findActiveUsersByType();
    res.send(activeUsers);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    //need to have a session inorder to create a new UserSession
    const userSessionFromUser = await Session.findOne({
      where: { userId: req.body.userId },
    });

    if (!userSessionFromUser) {
      res.sendStatus(401);
    }

    const newSessionInfo = {
      userId: req.body.userId,
      sid: userSessionFromUser.sid,
      selectedTopics: req.body.selectedTopics.split(', '),
      userType: req.body.userType,
      location: req.body.location,
    };

    const createdUserSession = await UserSession.create(newSessionInfo);

    res.send(createdUserSession);
  } catch (err) {
    next(err);
  }
});

router.put('/:userId', async (req, res, next) => {
  try {
    //implement when deployed. can only run one session at a time? Maybe a way to login multiple people through postman???
    //Want to check for BOTH a session and a UserSession. It is possible to be signed in burt not have an active UserSession
    // const checkSession = await Session.findOne({
    //   where: { userId: req.params.userId },
    // });

    const checkUserSession = await UserSession.findOne({
      where: { userId: req.params.userId },
    });

    if (!checkUserSession) {
      //add checkSession when deployed
      res.sendStatus(401);
    }
    const updateUser = await UserSession.updateUserSession(
      req.params.userId,
      req.body,
    );
    res.send(updateUser);
  } catch (err) {
    next(err);
  }
});

//Returns user session by userId
router.delete('/:userId', async (req, res, next) => {
  try {
    //implement when deployed. Same as above. Can close a User session without fully logging out
    // const checkSession = await Session.findOne({
    //   where: { userId: req.params.userId },
    // });

    const checkUserSession = await UserSession.findOne({
      where: { userId: req.params.userId },
    });

    //add checkSession test when deployed
    if (!checkUserSession) {
      res.sendStatus(401);
    }

    //Check if user has submitted a review.
    //This will require a form that will put to both the User profeciency on UserTopics model as well as to here for review status updates
    if (checkUserSession.reviewStatus === 'no review') {
      res.send('Please review your partners profeciency').end();
    } else {
      checkUserSession.destroy();
      res.send('user-session closed');
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
