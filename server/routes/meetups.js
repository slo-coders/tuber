const router = require('express').Router();
const {
  Meetup,
  UserMeetup,
  User,
  Topic,
  MeetupTopic,
} = require('../db/index.js');

router.get('/', async (req, res, next) => {
  try {
    res.send(await Meetup.findAll());
  } catch (err) {
    next(err);
  }
});

//get a topic for a specific meetup
router.get('/:meetupId/topics', async (req, res, next) => {
  try {
    const meetupTopicInstance = await Meetup.findOne({
      where: { id: req.params.meetupId },
      include: [{ model: Topic, attributes: ['id', 'title'] }],
      attributes: ['id'],
    });
    res.send(meetupTopicInstance);
  } catch (err) {
    next(err);
  }
});

router.get('/:meetupId', async (req, res, next) => {
  try {
    const meetupInstance = await Meetup.findOne({
      where: { id: req.params.meetupId },
      include: [
        { model: User, through: UserMeetup },
        { model: Topic, through: { model: MeetupTopic } },
      ],
    });
    res.send(meetupInstance);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
