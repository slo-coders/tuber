const router = require('express').Router();
const hash = require('../db/utils/hash');
const { User } = require('../db/models/index');

router.get('/login', async (req, res, next) => {
  try {
    console.log('SESSION', req.session);
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
    res.sendStatus(401);
    return;
  }
  try {
    const loggedSessionUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!loggedSessionUser) {
      res.sendStatus(401);
    } else if (loggedSessionUser.id === req.session.id) {
      res.send('Already logged in');
    }

    //this needs to be adjusted with the salted password verification
    if (hash(password) !== loggedSessionUser.password) {
      res.send('Unauthorized user. Please make an account');
    }

    //the golden line of code

    //How do you fix possilbe race conditions

    // eslint-disable-next-line require-atomic-updates
    req.session.userId = loggedSessionUser.id;
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
