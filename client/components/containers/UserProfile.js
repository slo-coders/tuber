import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoggedInThunked } from '../../actions/sessionActions';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.props.getLoggedInUser();
  }

  render() {
    console.log('logged in user info:', this.props.user.authUser ? this.props.user.authUser:'')
    return (
      <div>
      <div className="vertical1">
        <div className="turquoise"/>
          <hr/>
        </div>
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <h4 className="turquoise">{this.props.user.authUser.firstName}</h4>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
})

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUser: () => dispatch(fetchLoggedInThunked())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
