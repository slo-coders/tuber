import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
// import Chatroom from './reusables/Chatroom';
import Nav from './containers/Nav';
import UserProfile from './containers/UserProfile/UserProfile';
import RequestMatch from './containers/RequestMatch/RequestMatch';
import SignUp from './containers/SignUp/SignUp';
import MeetupRoom from './containers/meetupRoom';
import PropTypes from 'prop-types';
import { listTopicsThunk } from '../actions/topicActions';
import { fetchLoggedInThunked } from '../actions/sessionActions';
import Review from './containers/Review/Review';

class App extends React.Component {
  componentDidMount() {
    this.props.listTopics();
    this.props.getUser(); //logged in user at toplevel
  }

  render() {
    return (
      <HashRouter>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/request_match" component={RequestMatch} />
        <Route exact path="/meetuproom" component={MeetupRoom} />
        {/* <Route exact path="/chatroom" component={Chatroom} /> */}
        <Route exact path="/review" component={Review} />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listTopics: () => dispatch(listTopicsThunk()),
    getUser: () => dispatch(fetchLoggedInThunked()),
  };
};

App.propTypes = {
  listTopics: PropTypes.func,
  listUsers: PropTypes.func,
  getUser: PropTypes.func,
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
