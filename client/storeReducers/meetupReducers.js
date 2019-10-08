import {
  FETCH_MEETUP,
  POST_MEETUP,
  EDIT_MEETUP,
  REMOVE_SINGLE_MEETUP,
  GET_MEETUP_TOPIC,
} from '../actions/actionTypes';

const initialState = {
  meetups: [],
  singleMeetup: {},
  singleTopic: {},
};

const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEETUP:
      return { ...state, singleMeetup: action.payload };
    //removes singleMeetup instance from store state (to decouple and have not paired user)
    case REMOVE_SINGLE_MEETUP:
      return { ...state, singleMeetup: {} };

    case GET_MEETUP_TOPIC:
      return { ...state, singleTopic: action.payload };

    case POST_MEETUP:
      return { ...state, singleMeetup: [...state.meetups, action.payload] };
    case EDIT_MEETUP:
      return {
        ...state,
        courses: state.meetups.map(el =>
          el.id === action.payload.id ? action.payload : el,
        ),
      };



    default:
      return state;
  }
};

export default meetupReducer;
