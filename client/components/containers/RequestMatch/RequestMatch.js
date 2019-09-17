import React, { Component } from 'react';
import { connect } from 'react-redux';

class RequestMatch extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <span className="icon has-text-warning">
          <i className="fas fa-exclamation-triangle"></i>
        </span>
        <h4>The Request Match component is under construction.</h4>
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(RequestMatch);
