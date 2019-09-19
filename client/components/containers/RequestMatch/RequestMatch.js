import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseRole from './ChooseRole';

class RequestMatch extends Component {
  constructor() {
    super();
    this.state = {
      role: '',
    };
    this.handleRoleChoice = this.handleRoleChoice.bind(this);
  }

  handleRoleChoice(e) {
    this.setState({
      role: e.target.getAttribute('value'),
    });
  }

  render() {
    return (
      <div className="section">
        <ChooseRole handleRoleChoice={this.handleRoleChoice} />
      </div>
    );
  }
}

export default connect(
  null,
  null,
)(RequestMatch);
