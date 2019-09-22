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
        <div>
          <span className="icon has-text-warning">
            <i className="fas fa-exclamation-triangle"></i>
          </span>
          <div>The Home component is under construction</div>
        </div>
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
              <div className="column">
                <LoginForm />
              </div>
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
