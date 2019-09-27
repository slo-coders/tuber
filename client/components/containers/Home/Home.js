import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomeTiles from './HomeTiles';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.user.authUser.id) {
      return <HomeTiles loggedin={true} />;
    }
    return <HomeTiles loggedin={false} />;
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
