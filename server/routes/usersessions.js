const router = require('express').Router();
const {
  User,
  Course,
  CourseTopic,
  UserSession,
  Topic,
  UserTopic,
} = require('../db/index');

const matchToPartner = require('../db/utils/matchToPartner');

router.get('/', async (req, res, next) => {
  try {
    //returns active sessions filtered by userType
    const activeUsers = await UserSession.findActiveUsersByType();
    res.send(activeUsers);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const activeUserSession = await UserSession.findOne({
      where: { userId: req.params.userId },
    });
    res.send(activeUserSession);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, userType, location, courseId, topicId } = req.body;
    /* GET User instance with Topic info for topicsId from UserTopic*/
    const userInstance = await User.findOne({
      where: {
        id: userId,
      },
      include: [{ model: Topic, through: { model: UserTopic } }],
    });

    if (!userInstance) {
      res.sendStatus(401);
    }

    /* CREATE UserSession instance */
    const newSessionInfo = {
      userId: userId,
      userType: userType,
      location: location,
      userTopics: userInstance.topics.map(topic => topic.id),
    };

    //- mentors select a courseId and Topic info from topicIds in CourseTopic are pulled
    if (courseId && userType === 'mentor') {
      const selectedCourseWithTopics = await Course.findOne({
        where: { id: courseId },
        include: [{ model: Topic, through: { model: CourseTopic } }],
      });
      const allTopicIdsInCourse = selectedCourseWithTopics.topics.map(
        topic => topic.id,
      );
      const ratedTopicIds = userInstance.topics.map(topic => topic.id);
      newSessionInfo.selectedTopics = allTopicIdsInCourse.filter(topicId =>
        ratedTopicIds.includes(topicId),
      );
    }
    //- mentees/peers select a single topicId item for an array
    else if (topicId && userType !== 'mentor') {
      newSessionInfo.selectedTopics = [topicId];
    }

    const userSession = await UserSession.create(newSessionInfo);
    let matchedUserMeetupInfo;

    /* Check UserSessions for possible partners with whom to create a Meetup */
    //TODO: change "FIFO" idea for better algo that
    //considers skipping mentor to maximize number of meetups
    try {
      if (
        userType === 'mentee' ||
        userType === 'mentor' ||
        userType === 'peer'
      ) {
        matchedUserMeetupInfo = await matchToPartner(
          userId,
          userType,
          location,
          userSession.selectedTopics,
        );

        /* //TODO:
        CONFIRM MEETUP BTWN MENTEE AND MENTOR BEFORE DESTROYING USERSESSION
        IF CONFIRMED === 'FALSE', delete mentor from mentee's possible mentors array, 
        but DO NOT DELETE userSession; creating them again would change createdAt and put them at 
        the end of the sorted array of users
         */

        // DESTROY mentee's recently created UserSession instance
        userSession.destroy();

        // DESTROY mentor's pre-existing UserSession instance
        const partnerUserSession = await UserSession.findOne({
          where: { userId: matchedUserMeetupInfo.partner.userId },
        });
        await partnerUserSession.destroy();

        // RESPOND with UserMeetup info
        res.status(201).send(matchedUserMeetupInfo);
      } else {
        res.send(userSession);
      }
    } catch {
      res.send(userSession);
    }
  } catch (err) {
    res.send(
      'Failed POST; could not findOne instance of UserSession matching this userId.',
    );
    // next(err);
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
      res.send(
        'Failed PUT; could not findOne instance of UserSession matching this userId.',
      );
      res.sendStatus(401);
    }
    const updatedUser = await UserSession.updateUserSession(
      req.params.userId,
      req.body,
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
});

//Returns user sessions by userId
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
    //
    // if (checkUserSession.reviewStatus === 'no review') {
    //   res.send('Please review your partners profeciency').end();
    // } else {
    //   checkUserSession.destroy();
    //   res.send('user-session closed');
    // }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
