//Session
export const FETCH_LOGGED_USER = 'FETCH_LOGGED_USER';
export const LOGIN_USER = 'LOGIN_USER ';
export const LOGOUT_USER = 'LOGOUT_USER';

//User-session actions
export const FETCH_ACTIVE_SESSIONS = 'FETCH_USER_SESSIONS';
export const CREATE_USER_SESSION = 'CREATE_USER_SESSION';
export const CHANGE_USER_SESSION = 'CHANGE_USER_SESSION';
export const CLOSE_USER_SESSION = 'CLOSE_USER_SESSION';

//Course actions
export const FETCH_COURSE_ALL = 'FETCH_COURSE_ALL';
export const FETCH_COURSE = 'FETCH_COURSE';
export const FETCH_COURSE_TOPICS = 'FETCH_COURSE_TOPICS';
export const DELETE_COURSE = 'DELETE_COURSE';
export const POST_COURSE = 'POST_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';

//Topic actions
export const FETCH_TOPIC_ALL = 'FETCH_TOPIC_ALL';
export const FETCH_TOPIC = 'FETCH_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const POST_TOPIC = 'POST_TOPIC';
export const EDIT_TOPIC = 'EDIT_TOPIC';

//Meetup actions
export const FETCH_MEETUP = 'FETCH_MEETUP';
export const DELETE_MEETUP = 'DELETE_MEETUP';
export const POST_MEETUP = 'POST_MEETUP';
export const EDIT_MEETUP = 'EDIT_MEETUP';

//Special MeetupRoom actions
export const CREATE_MEETUP_ROOM = 'CREATE_MEETUP_ROOM';

//Partner actions
export const FETCH_PARTNER = 'FETCH_PARTNER';
export const UPDATE_PARTNER_USERMEETUP = 'UPDATE_PARTNER_USERMEETUP';

//User actions
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_USER = 'FETCH_USER';
export const POST_USER = 'POST_USER';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER';

//User-meetup actions
export const GET_MEETUP_DATA = 'GET_MEETUP_DATA';
export const UPDATE_MEETUP_DATA = 'UPDATE_MEETUP_DATA';
export const GET_USER_MEETUP_DATA = 'GET_USER_MEETUP_DATA ';

//User-topic actions
export const GET_ALL_USER_TOPICS = 'GET_ALL_USER_TOPICS';

// export const GET_USER_TOPIC = 'GET_USER_TOPIC';
export const POST_USER_TOPICS_ARR = 'POST_USER_TOPICS_ARR';
export const UPDATE_USER_TOPIC = 'UPDATE_USER_TOPIC';
export const DELETE_USER_TOPIC = 'DELETE_USER_TOPIC';
