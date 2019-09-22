const router = require('express').Router();
const { verifyPassword } = require('../db/utils/hash');
const { User } = require('../db/models/index');

router.get('/login', async (req, res, next) => {
  //BEHAVIOR: takes req.session.userId returns user data w/o password and salt
  try {
    const loggedUser = await User.scope('withoutPassword').findOne({
      where: { id: req.session.userId },
    });
    res.send(loggedUser);
  } catch (err) {
    res.send('please sign in or register');
    next(err);
  }
});
router.post('/login', async (req, res, next) => {
  //BEHAVIOR: takes email and password returns cookie with SID
  //BEHAVIOR: set header error occurs when SID already present
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
    res.send(loggedSessionUser);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('SID');
  res.send('session logged out');
});

module.exports = router;
