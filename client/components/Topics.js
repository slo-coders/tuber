import React from 'react';
import { listTopicsThunk } from '../actions/topicActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Topics extends React.Component {
  componentDidMount() {
    this.props.listTopics();
  }
  render() {
    const { topics } = this.props.topics;
    if (topics === undefined) return null;
    return (
      <div>
        {topics.map(topic => (
          <div key={topic.id}>{topic.title}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topics: state.topics,
});

const mapDispatchToProps = dispatch => {
  return {
    listTopics: () => dispatch(listTopicsThunk()),
  };
};

Topics.defaultProps = {
  topics: [],
};
Topics.propTypes = {
  topics: PropTypes.object,
  listTopics: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topics);
