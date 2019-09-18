import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoggedInThunked } from '../../actions/sessionActions';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLoggedInUser();
  }

  render() {
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
          <h4 className="turquoise">{this.props.user.authUser.firstName}</h4>
        </div>
      </CSSTransitionGroup>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUser: () => dispatch(fetchLoggedInThunked()),
  };
};

UserProfile.propTypes = {
  user: PropTypes.object,
  getLoggedInUser: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
