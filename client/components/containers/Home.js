import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

const Home = () => {
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <div>The Home component is under construction</div>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login"> Log In </Link>
      </div>
    </CSSTransitionGroup>
  );
};

export default Home;
