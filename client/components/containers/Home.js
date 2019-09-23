import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.user.authUser.id) {
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
                <div className="tile is-parent is-vertical" style={{paddingRight:"0px"}}>
                  <div className="tile is-parent">
                    <div className="tile is-child">

                      <div className="level">
                      <div className="level-left">
                        <h1 className="title" style={{ display: "inline-block", marginBottom: "0px" }}>Tuber</h1>
                        <p style={{ display: "inline-block" }}>
                          {' '}
                          Yeahhhh I know this text is too close to the title it's gonna be okay
                        </p>
                        </div>
                      </div>


                    </div>
                  </div>

                  <div className="tile is-parent" style={{ padding: '0px' }}>
                    <div className="tile is-parent">
                      <div className="tile is-child box tileColor">
                        <p>
                          {' '}
                          Lorem ipsum dolor sit amet, pri quod inimicus
                          disputando cu, sit facilisi abhorreant in. Lorem ipsum
                          dolor sit amet, pri quod inimicus disputando cu, sit
                          facilisi abhorreant in.Lorem ipsum dolor sit amet, pri
                          quod inimicus disputando cu, sit facilisi abhorreant
                          in.Lorem ipsum dolor sit amet, pri quod inimicus
                          disputando cu, sit facilisi abhorreant in.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="tile is-parent" style={{ padding: '0px' }}>
                    <div className="tile is-parent">
                      <div className="tile is-child box tileColor">
                        <strong>
                          Login form will go here if not logged in
                        </strong>
                        <p>
                          Otherwise, we can display something else, like a
                          picture
                        </p>
                        <p>
                          {' '}
                          Lorem ipsum dolor sit amet, pri quod inimicus
                          disputando cu, sit facilisi abhorreant in.
                        </p>
                      </div>
                    </div>

                    <div className="tile is-parent">
                      <div className="tile is-child box tileColor">
                        <p>
                          {' '}
                          Lorem ipsum dolor sit amet, pri quod inimicus
                          disputando cu, sit facilisi abhorreant in.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tile is-parent is-vertical is-4" style={{paddingLeft:"0px"}}>
                  <div className="tile is-parent" >
                    <div className="tile is-child box tileColor">
                      {/* <p>
                        {' '}
                        Lorem ipsum dolor sit amet, pri quod inimicus disputando
                        cu, sit facilisi abhorreant in.
                      </p> */}
                      <div style={{paddingBottom:"8px"}}>
                      <strong>Log in</strong>
                      </div>
                      <LoginForm />
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
            </div>
          </div>
        </CSSTransitionGroup>
      );
    }
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
              <LoginForm />
            </div>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

Home.defaultProps = {
  user: PropTypes.object,
  authUser: PropTypes.object,
  id: PropTypes.string,
};
Home.propTypes = {
  user: PropTypes.object,
  authUser: PropTypes.func,
  id: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(Home);
