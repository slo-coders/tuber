import React from 'react';
import { listUsersThunk } from '../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Users extends React.Component {
  componentDidMount() {
    this.props.listUsers();
  }
  render() {
    const { users } = this.props;
    if (users === undefined) return null;
    return (
      <div>
        This is the users component
        {users.map(user => (
          <div key={user.userId}>{`${user.firstName} ${user.lastName}`}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.allUsers,
});

const mapDispatchToProps = dispatch => {
  return {
    listUsers: () => dispatch(listUsersThunk()),
  };
};

Users.defaultProps = {
  users: [],
};
Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  listUsers: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
