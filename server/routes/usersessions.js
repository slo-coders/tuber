const router = require('express').Router();
const {
  User,
  Course,
  CourseTopic,
  UserSession,
  Topic,
  UserTopic,
  UserMeetup,
  Meetup,
  MeetupTopic,
} = require('../db/index');

const getMentorAsync = require('../db/utils/matchMentors');
const getMenteesAsync = require('../db/utils/matchMentees');

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
    //need to have a session inorder to create a new UserSession
    const userSessionFromUser = await User.findOne({
      where: {
        id: req.body.userId,
      },
      include: [{ model: Topic, through: { model: UserTopic } }],
    });

    if (!userSessionFromUser) {
      res.sendStatus(401);
    }

    const newSessionInfo = {
      userId: req.body.userId,
      userType: req.body.userType,
      location: req.body.location,
      userTopics: userSessionFromUser.topics.map(topic => topic.id), //for mentors
    };

    if (req.body.courseId && req.body.userType === 'mentor') {
      const selectedCourseTopics = await Course.findOne({
        where: { id: req.body.courseId },
        include: [{ model: Topic, through: { model: CourseTopic } }],
      });
      newSessionInfo.selectedTopics = selectedCourseTopics.topics.map(
        topic => topic.id,
      );
    } else if (req.body.topicId && req.body.userType !== 'mentor') {
      newSessionInfo.selectedTopics = [req.body.topicId];
    }

    const createdUserSession = await UserSession.create(newSessionInfo);
    let currentUserSession = createdUserSession;
    /////////ABOVE IS GENENERATED FROM THE FORM/////////////

    //SKIPPING Confirmations
    //Match 2 Users from Map returned by getMentorAsync
    if (req.body.userType === 'mentee') {
      getMentorAsync().then(async obj => {
        // CREATE Meetup instance with meetupType, location, and timeMatched
        if (obj[req.body.userId][0]) {
          const meetup = await Meetup.create({
            meetupType:
              req.body.userType === 'mentor' || req.body.userType === 'mentee'
                ? 'M:M'
                : 'P:P',
            location: req.body.location,
          });

          // console.log('MEETUP CREATE', meetup);

          // CREATE 2 UserMeetup instances with 2 userIds (mentee and mentor)
          // Mentee/Peer1
          if (obj[req.body.userId].length) {
            //mentr is available
            //TODO: change "selectFirstMentor w/ 0" idea for a better algo that
            //considers skipping if other mentee's possible mentors lists

            // Find mentee UserTopic instance (w/ proficiencyRating)

            const menteeUserTopicInstance = await UserTopic.findOne({
              where: {
                userId: req.body.userId,
                topicId: req.body.topicId,
              },
            });

            //Mentee/Peer1
            const uMeetupMentee = await UserMeetup.create({
              meetupId: meetup.id,
              userId: req.body.userId,
              proficiencyRating: menteeUserTopicInstance.proficiencyRating,
              userType: 'mentee',
            });
            console.log('MEETUP MENTEE', uMeetupMentee);

            // Mentor/Peer2
            const { mentorId, rating } = obj[req.body.userId][0];
            const uMeetupMentor = await UserMeetup.create({
              meetupId: meetup.id,
              userId: mentorId,
              proficiencyRating: rating,
              userType: 'mentor',
            });
            console.log('MEETUP MENTOR', uMeetupMentor);

            // CREATE MeetupTopic instace with topicId/menteeSelectedTopic from UserSession
            MeetupTopic.create({
              meetupId: meetup.id,
              topicId: req.body.topicId,
            });

            // DESTROY UserSession instance
            //session from mentee
            const mentorUserSession = UserSession.findOne({
              where: { userId: mentorId },
            });
            mentorUserSession.destroy();

            //Session from user
            const menteeUserSession = UserSession.findOne({
              where: { userId: req.body.userId },
            });
            menteeUserSession.destroy();
          }
        }

        // RE-RUN getMentors to eliminate mentor from various arrays
        getMentorAsync();
      });
    }
    if (req.body.userType === 'mentor') {
      getMenteesAsync().then(async obj => {
        // CREATE Meetup instance with meetupType, location, and timeMatched
        if (obj[req.body.userId][0]) {
          const meetup = await Meetup.create({
            meetupType: 'M:M',
            location: req.body.location,
          });

          // CREATE 2 UserMeetup instances with 2 userIds (mentee and mentor)
          // Mentee/Peer1
          if (obj[req.body.userId].length) {
            // Find mentee UserTopic instance (w/ proficiencyRating)

            const mentorUserTopicInstance = await UserTopic.findOne({
              where: {
                userId: req.body.userId,
                topicId: req.body.topicId,
              },
            });

            //Mentor/Peer1
            const uMeetupMentee = await UserMeetup.create({
              meetupId: meetup.id,
              userId: req.body.userId,
              userType: 'mentor',
              proficiencyRating: mentorUserTopicInstance.proficiencyRating,
            });
            console.log('MEETUP Mentee', uMeetupMentee);
            // Mentee/Peer2
            const { menteeId, rating } = obj[req.body.userId][0];
            const uMeetupMentor = await UserMeetup.create({
              meetupId: meetup.id,
              userId: menteeId,
              userType: 'mentee',
              proficiencyRating: rating,
            });
            console.log('MEETUP MENTOR', uMeetupMentor);

            // CREATE MeetupTopic instace with topicId/menteeSelectedTopic from UserSession
            MeetupTopic.create({
              meetupId: meetup.id,
              topicId: req.body.topicId,
            });

            // DESTROY UserSession instance

            //////////// THIS IS DESTROYING THE USER_MEETUP NOT THE USER SESSION
            uMeetupMentee.destroy();
            uMeetupMentor.destroy();
          }
        }

        // RE-RUN getMentors to eliminate mentor from various arrays
        getMenteesAsync();
      });
    }
    res.send(currentUserSession);
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
