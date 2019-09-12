const router = require('express').Router();
const { verifyPassword } = require('../db/utils/hash');
const { User, UserSession, Session } = require('../db/models/index');

router.get('/login', async (req, res, next) => {
  try {
    console.log('SESSION get', req.session);
    const loggedUser = await User.findOne({
      where: { id: req.session.userId },
    });
    res.send(loggedUser);
  } catch (err) {
    res.send('please sign in or register');
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send('Please enter a valid email and password');
    return;
  }
  try {
    const loggedSessionUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!loggedSessionUser) {
      res.sendStatus(401);
    } else if (req.session.userId === loggedSessionUser.id) {
      res.send('Already logged in');
    }

    const verified = verifyPassword(
      password,
      loggedSessionUser.password,
      loggedSessionUser.salt,
    );

    if (!verified) {
      res.send('Unauthorized user. Please make an account');
    }

    // eslint-disable-next-line require-atomic-updates
    req.session.userId = loggedSessionUser.id;

    res.send('You are logged in');
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => console.error(err));
  res.clearCookie('SID');
  res.send('session logged out');
});

//for UserSession functionality

//return all active users
router.get('/usersession', async (req, res, next) => {
  try {
    //returns actie sessions filtered by userType
    const activeUsers = await UserSession.findActiveUsersByType();
    res.send(activeUsers);
  } catch (err) {
    next(err);
  }
});

router.post('/usersession', async (req, res, next) => {
  try {
    //need to have a session inorder to create a new UserSession
    const userSessionFromUser = await Session.findOne({
      where: { userId: req.body.userId },
    });

    if (!userSessionFromUser) {
      res.sendStatus(401);
    }
    //combine information from users session
    const newSessionInfo = {
      userId: req.body.userId,
      sid: userSessionFromUser.sid,
      selectedTopics: req.body.selectedTopics.split(','),
      userType: req.body.userType,
      location: req.body.location,
    };

    const createdUserSession = await UserSession.create(newSessionInfo);

    res.send(createdUserSession);
  } catch (err) {
    next(err);
  }
});

router.put('/usersession/:userId', async (req, res, next) => {
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

router.delete('/usersession/:userId', async (req, res, next) => {
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

    checkUserSession.destroy();
    res.send('user-session closed');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
