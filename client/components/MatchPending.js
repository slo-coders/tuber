import React, { Component } from 'react';
import { connect } from 'react-redux';

class MatchPending extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h4>The Match Pending component is under construction.</h4>;
  }
}

export default connect(
  null,
  null,
)(MatchPending);
