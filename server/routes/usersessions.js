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
    const {userId, userType, location, courseId, topicId} = req.body;
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
      console.log('MENTORs SELECTED COURSE WITH TOPICS IN POST ROUTE TO /api/usersession: ', selectedCourseWithTopics);
      /* newSessionInfo.selectedTopics = selectedCourseWithTopics.topics.map(
        topic => topic.id,
      ); */
      const allTopicIdsInCourse = selectedCourseWithTopics.topics.map(
        topic => topic.id,
      );
      const ratedTopicIds = userInstance.topics.map(topic => topic.id);
      newSessionInfo.selectedTopics = allTopicIdsInCourse.filter(topicId => ratedTopicIds.includes(topicId));
    } 
    //- mentees/peers select a single topicId item for an array
    else if (topicId && userType !== 'mentor') {
      newSessionInfo.selectedTopics = [topicId];
    }

    const userSession = await UserSession.create(newSessionInfo);

    /* MENTEE - Check UserSessions for possible mentors with whom to create a Meetup */
    //TODO: change "selectFirstMentor" idea for better algo that
    //considers skipping mentor to maximize number of meetups fore mentess
    if (userType === 'mentee') {
      getMentorAsync().then(async possibleMentorForMentees => {
        /* CREATE Meetup instance with user's meetupType, location, and timeMatched*/
        if (possibleMentorForMentees[userId].length) {
          const meetup = await Meetup.create({
            location,
            meetupType:
              userType === 'mentee' 
              ? 'M:M'
              : 'ERROR: Could not CREATE "M:M" Meetup instance during POST to /api/usersessions',
            //timeMatched:
          });
            
          /* CREATE 2 UserMeetup instances with 2 userIds (mentee and mentor)*/
          // Find mentee UserTopic instance (w/ proficiencyRating)
          const menteeUserTopicInstance = await UserTopic.findOne({
            where: {
              userId,
              topicId,
            },
          });
          // CREATE Mentee UserMeetup
          const uMeetupMentee = await UserMeetup.create({
            userId,
            userType: 'mentee',
            meetupId: meetup.id,
            proficiencyRating: menteeUserTopicInstance.proficiencyRating,
          });
          
          // CREATE Mentor UserMeetup
          const { mentorId, rating } = possibleMentorForMentees[userId][0];
          const uMeetupMentor = await UserMeetup.create({
            userId: mentorId,
            userType: 'mentor',
            meetupId: meetup.id,
            proficiencyRating: rating,
          });
            
          // CREATE MeetupTopic instace with topicId from Mentee's req.body
          MeetupTopic.create({
            meetupId: meetup.id,
            topicId,
          });
            

          //TODO:
          //CONFIRM MEETUP BTWN MENTEE AND MENTOR BEFORE DESTROYING USER
          //IF CONFIRMED === 'FALSE', delete mentor from mentee's possible mentors array, but DO NOT DELETE userSession

          // DESTROY mentee's recently created UserSession instance
          userSession.destroy();

          // DESTROY mentor's pre-existing UserSession instance
          const mentorUserSession = await UserSession.findOne({
            where: { userId: mentorId },
          });
          await mentorUserSession.destroy();

          //RESPOND with UserMeetup info
          res.status(201).send({mentee: uMeetupMentee, mentor: uMeetupMentor});
        }
        else {
          res.send(userSession);
        }

        // RE-RUN getMentors to delete mentee from keys in object, and 
        // delete mentors from possibleMentors arrays for other users/mentees
        getMentorAsync();
      });
    }

    /* MENTOR - */
    /*else if (req.body.userType === 'mentor') {
      getMenteesAsync().then(async possibleMentorForMentees => {
        // CREATE Meetup instance with meetupType, location, and timeMatched
        if (possibleMentorForMentees[req.body.userId][0]) {
          const meetup = await Meetup.create({
            meetupType: 'M:M',
            location: req.body.location,
          });

          // CREATE 2 UserMeetup instances with 2 userIds (mentee and mentor)
          // Mentee/Peer1
          if (possibleMentorForMentees[req.body.userId].length) {
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
            const { menteeId, rating } = possibleMentorForMentees[req.body.userId][0];
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
    } */
    else {
      res.send(userSession);
    }
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
