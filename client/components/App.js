import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';
import UserProfile from './UserProfile';
import RequestMatch from './RequestMatch';
import { LoginForm } from './LoginForm';

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <HashRouter>
        <Route path="/" component={Nav} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route
          exact
          path="/request_match"
          /* path will eventually depend on match status */ component={
            RequestMatch
          }
        />
        <Route exact path="/login" component={LoginForm} />
      </HashRouter>
    );
  }
}

export default App;
