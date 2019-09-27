import React from 'react';
import LoginForm from '../LoginForm';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

export default function HomeTiles(props) {
  return (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionName="componentFadeIn"
      transitionAppearTimeout={9000}
      transitionLeaveTimeout={9000}
      transitionEnterTimeout={9000}
    >
      <div className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="tile is-ancestor">
            <div
              className="tile is-parent is-vertical"
              style={{ paddingRight: '0px' }}
            >
              <div className="tile is-parent">
                <div className="tile is-child">
                  <div className="level">
                    <div className="level-left">
                      <h1
                        className="title"
                        style={{ display: 'inline-block', marginBottom: '0px' }}
                      >
                        Tuber
                      </h1>
                      <p
                        style={{
                          marginLeft: '10px',
                          paddingTop: '13px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {'Harness the power of the 33% Rule.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tile is-parent" style={{ padding: '0px' }}>
                <div className="tile is-parent">
                  <div
                    className="tile is-child box tileColor"
                    style={{ borderRadius: '0px', color: '#000000' }}
                  >
                    <p>
                      What exactly is the <strong>33% Rule</strong>? It
                      basically states that 33% of your time should be spent
                      with mentors (people that challenge you), 33% with your
                      peers (those on the same level as you), and 33% with
                      people that you can mentor and guide. Tuber allows you to
                      practice this philosophy with a community of people near
                      you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tile is-parent" style={{ padding: '0px' }}>
                <div className="tile is-parent">
                  <div
                    className="tile is-child box tileColor"
                    style={{ borderRadius: '0px' }}
                  >
                    <h1 className="title" style={{ marginBottom: '0px' }}>
                      Teach
                    </h1>
                    <hr />
                    <p>
                      One of the best ways to learn is by teaching others. Tuber
                      gives you the opportunity to{' '}
                      <strong>share your knowledge</strong> by matching you to a
                      network of learners.
                    </p>
                  </div>
                </div>

                <div className="tile is-parent">
                  <div
                    className="tile is-child box tileColor"
                    style={{ borderRadius: '0px' }}
                  >
                    <h1 className="title" style={{ marginBottom: '0px' }}>
                      Collaborate
                    </h1>
                    <hr />
                    <p>
                      You don't have to do it alone!{' '}
                      <strong>Work with others</strong> on your level. Tuber
                      connects you with a study buddy to turn your study time
                      into quality time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tile is-parent is-vertical is-4"
              style={{ paddingLeft: '0px' }}
            >
              <div className="tile is-parent">
                <div
                  className="tile is-child box tileColor"
                  style={{ borderRadius: '0px' }}
                >
                  {props.loggedin ? (
                    <strong>you are logged in!</strong>
                  ) : (
                    <div>
                      {' '}
                      <div style={{ paddingBottom: '8px' }}>
                        <strong>Log in to get started!</strong>
                      </div>
                      <LoginForm />{' '}
                    </div>
                  )}
                </div>
              </div>

              <div className="tile is-parent">
                <div
                  className="tile is-child box tileColor"
                  style={{ borderRadius: '0px' }}
                >
                  <h1 className="title" style={{ marginBottom: '0px' }}>
                    Learn
                  </h1>
                  <hr />
                  <p>
                    Everyone has to start somewhere! Achieve mastery in a topic
                    by allowing Tuber to match you with a mentor that can help
                    you <strong>sharpen your skills</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransitionGroup>
  );
}

HomeTiles.propTypes = {
  loggedin: PropTypes.boolean,
};
