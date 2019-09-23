import {
  FETCH_MEETUP,
  DELETE_MEETUP,
  POST_MEETUP,
  EDIT_MEETUP,
} from '../actions/actionTypes';

const initialState = {
  meetups: [],
  singleMeetup: {},
};

const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEETUP:
      return { ...state, singleMeetup: action.payload };

    case POST_MEETUP:
      return { ...state, singleMeetup: [...state.meetups, action.payload] };
    case EDIT_MEETUP:
      return {
        ...state,
        courses: state.meetups.map(el =>
          el.id === action.payload.id ? action.payload : el,
        ),
      };

    case DELETE_MEETUP:
      return {
        ...state,
        meetups: state.meetups.filter(el => el.id !== action.payload),
      };

    default:
      return state;
  }
};

export default meetupReducer;
