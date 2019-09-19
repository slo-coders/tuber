import React, { Component } from 'react';
import ClickableStar from './ClickableStar';
import PropTypes from 'prop-types';

export default class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      star1: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault;
    this.props.handleStarClick(e, this.props.topic);
    let _value = e.target.getAttribute('value');

    if (_value <= 100) {
      this.setState({
        star1: !this.state.star1,
        value: 0,
      });
    } else {
      this.setState({
        star1: true,
        value: _value,
      });
    }
  }

  render() {
    const { value } = this.state;
    const values = [200, 300, 400, 500];
    return (
      <span onClick={this.handleClick} id={this.props.topic}>
        <ClickableStar
          filled={this.state.star1}
          value={100}
          name={this.props.topic}
        />
        {values.map(number => (
          <ClickableStar
            key={number}
            filled={value >= number}
            value={number}
            name={this.props.topic}
          />
        ))}
      </span>
    );
  }
}

StarRating.propTypes = {
  topic: PropTypes.string,
  handleStarClick: PropTypes.func,
};
