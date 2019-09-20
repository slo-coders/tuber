import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import LoginForm from './LoginForm';

const Home = () => {
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="section">
        <div className="container">
          <div className="level">
            <div className="column">
              <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    </CSSTransitionGroup>
  );
};

export default Home;
