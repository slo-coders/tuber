import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home';
import Nav from './containers/Nav';
import UserProfile from './containers/UserProfile/UserProfile';
import RequestMatch from './containers/RequestMatch/RequestMatch';
import SignUp from './containers/SignUp/SignUp';
import PropTypes from 'prop-types';
import { listTopicsThunk } from '../actions/topicActions';
import { listUsersThunk } from '../actions/userActions';
import { fetchLoggedInThunked } from '../actions/sessionActions';

class App extends React.Component {
  componentDidMount() {
    console.log('mounted');
    /* will probably move, keeping fetch at high level for now */
    this.props.listTopics();
    this.props.listUsers();
    this.props.getUser();
    console.log(this.props);
  }

  render() {
    return (
      <HashRouter>
        <Route path="/" component={() => <Nav {...this.props} />} />
        <Route exact path="/home" component={() => <Home />} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/signup" component={SignUp} />
        <Route
          exact
          path="/request_match"
          /* path will eventually depend on match status */ component={
            RequestMatch
          }
        />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    listTopics: () => dispatch(listTopicsThunk()),
    listUsers: () => dispatch(listUsersThunk()),
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
