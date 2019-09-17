import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoggedInThunked } from '../../actions/sessionActions';
import { getUserTopicsThunked } from '../../actions/userTopicActions';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getLoggedInUser();
    // set Timeout?
    this.props.getUserTopics("541686f7-e912-4acd-a2b3-a1dbc1912451");
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('newProps', newProps);
  //   // this.propsUpdates.next(newProps)
  //   if(!newProps.topics.userTopics.length === 0){
  //   this.props.getUserTopics(newProps.user.authUser.id);
  //   }
  // }

  render() {
    console.log('this.props.userTopics', this.props.topics.userTopics);
    const { userTopics } = this.props.topics;

    if( userTopics ){
    return (
      
      <CSSTransitionGroup
        transitionAppear={true}
        transitionName="componentFadeIn"
        transitionAppearTimeout={9000}
        transitionLeaveTimeout={9000}
        transitionEnterTimeout={9000}
      >
        <div class="section">
          <h4 className="turquoise">Name: {this.props.user.authUser.firstName + " " + this.props.user.authUser.lastName}</h4>
          <h4 className="turquoise">Email Address: {this.props.user.authUser.email}</h4>
          {userTopics.map(topic => <h5>{topic.proficiencyRating}</h5>)}
        </div>
      </CSSTransitionGroup>
    );
  }
}
}

const mapStateToProps = state => ({
  user: state.auth,
  topics: state.userTopics
});

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUser: () => dispatch(fetchLoggedInThunked()),
    getUserTopics: ( userId ) => dispatch(getUserTopicsThunked( userId ))
  };
};

UserProfile.propTypes = {
  user: PropTypes.string,
  getLoggedInUser: PropTypes.func,
  getUserTopics: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
