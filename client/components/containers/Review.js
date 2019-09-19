import React, { Component } from 'react';
import { connect } from 'react-redux';

class Review extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <h4>The Review component is under construction.</h4>;
  }
}

export default connect(
  null,
  null,
)(Review);
