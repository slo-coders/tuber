const router = require('express').Router();
const { verifyPassword } = require('../db/utils/hash');
const { User } = require('../db/models/index');

router.get('/login', async (req, res, next) => {
  try {
    //console.log('SESSION get', req.session);
    const loggedUser = await User.findOne({
      where: { userId: req.session.userId },
    });
    res.send(loggedUser);
  } catch (err) {
    res.send('please sign in or register');
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  //console.log('SESSION POST', req.session);
  console.log('SESSION POST BODY', req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send('Please enter a valid email and password');
    return;
  }
  try {
    //LEFT OFF HERE
    console.log('We tried');
    const loggedSessionUser = await User.findOne({
      where: {
        email: req.body.email,
      }
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

    //the golden line of code

    //How do you fix possilbe race conditions

    // eslint-disable-next-line require-atomic-updates
    req.session.userId = loggedSessionUser.id;

    res.send('You are logged in');
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => console.log(err));
  res.clearCookie('SID');
  res.send('session loggedout');
});

module.exports = router;
