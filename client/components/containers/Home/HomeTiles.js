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
                      <p>
                        {
                          'Yeahhhh I know this text is too close to the title its gonna be okay'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tile is-parent" style={{ padding: '0px' }}>
                <div className="tile is-parent">
                  <div className="tile is-child box tileColor">
                    <p>
                      Lorem ipsum dolor sit amet, pri quod inimicus disputando
                      cu, sit facilisi abhorreant in. Lorem ipsum dolor sit
                      amet, pri quod inimicus disputando cu, sit facilisi
                      abhorreant in.Lorem ipsum dolor sit amet, pri quod
                      inimicus disputando cu, sit facilisi abhorreant in.Lorem
                      ipsum dolor sit amet, pri quod inimicus disputando cu, sit
                      facilisi abhorreant in.
                    </p>
                  </div>
                </div>
              </div>

              <div className="tile is-parent" style={{ padding: '0px' }}>
                <div className="tile is-parent">
                  <div className="tile is-child box tileColor">
                    <strong>Login form will go here if not logged in</strong>
                    <p>
                      Otherwise, we can display something else, like a picture
                    </p>
                    <p>
                      {' '}
                      Lorem ipsum dolor sit amet, pri quod inimicus disputando
                      cu, sit facilisi abhorreant in.
                    </p>
                  </div>
                </div>

                <div className="tile is-parent">
                  <div className="tile is-child box tileColor">
                    <p>
                      {' '}
                      Lorem ipsum dolor sit amet, pri quod inimicus disputando
                      cu, sit facilisi abhorreant in.
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
                <div className="tile is-child box tileColor">
                  {props.loggedin ? (
                    <strong>you are logged in</strong>
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
                <div className="tile is-child box tileColor">
                  <p>
                    {' '}
                    Lorem ipsum dolor sit amet, pri quod inimicus disputando cu,
                    sit facilisi abhorreant in.
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
