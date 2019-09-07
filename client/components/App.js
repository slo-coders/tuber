import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from '../components/Home';
import Courses from '../components/Courses';

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Courses />
        </div>
      </HashRouter>
    );
  }
}

export default App;
