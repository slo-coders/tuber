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

router.post('/', async (req, res, next) => {
  try {
    const newMeetup = await Meetup.create({
      meetupType: req.body.meetupType,
      location: req.body.location,
      matchedAt: req.body.matchedAt,
      meetupEnded: req.body.meetupEnded,
    });
    res.status(201).send(newMeetup);
  } catch (err) {
    next(err);
  }
});

router.put('/:meetupId', async (req, res, next) => {
  try {
    const meetupUpdate = await Meetup.findByPk(req.params.meetupId);
    meetupUpdate.update({
      meetupType: req.body.meetupType,
      location: req.body.location,
    });
    res.send(meetupUpdate);
  } catch (err) {
    next(err);
  }
});

router.delete('/:meetupId', async (req, res, next) => {
  try {
    await Meetup.destroy({ where: { id: req.params.meetupId } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
