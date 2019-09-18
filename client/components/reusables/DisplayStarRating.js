import React, { Component } from 'react';
import ClickableStar from './ClickableStar';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfAlt as faStarHalfAlt } from '@fortawesome/fontawesome-free-solid';

export default class DisplayStarRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star50: false,
      star100: false,
      star150: false,
      star200: false,
      star250: false,
      star300: false,
      star350: false,
      star400: false,
      star450: false,
      star500: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    e.preventDefault;
    this.props.handleStarClick(e, this.props.topic);

    let value = e.target.getAttribute('value');
    if (value >= 100) {
      this.setState({
        star100: !this.state.star100,
      });
      if (value >= 200) {
        this.setState({
          star200: !this.state.star200,
        });
        if (value >= 300) {
          this.setState({
            star300: !this.state.star300,
          });
          if (value >= 400) {
            this.setState({
              star400: !this.state.star400,
            });
            if (value >= 500) {
              this.setState({
                star500: !this.state.star500,
              });
              
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <span onClick={this.handleClick} id={this.props.topic}>
        <ClickableStar filled={this.state.star100} value={100} name={this.props.topic} />
        <i className={this.state.star50 ? "fas fa-star-half-alt" : ''}/>
        <ClickableStar filled={this.state.star200} value={200} name={this.props.topic} />
        <i className={this.state.star150 ? "fas fa-star-half-alt" : ''}/>
        <ClickableStar filled={this.state.star300} value={300} name={this.props.topic} />
        <i className={this.state.star250 ? "fas fa-star-half-alt" : ''}/>
        <ClickableStar filled={this.state.star400} value={400} name={this.props.topic} />
        <i className={this.state.star350 ? "fas fa-star-half-alt" : ''}/>
        <ClickableStar filled={this.state.star500} value={500} name={this.props.topic} />
        <i className={this.state.star450 ? "fas fa-star-half-alt" : ''}/>
      </span>
    );
  }
}

DisplayStarRating.propTypes = {
  topic: PropTypes.string,
  handleStarClick: PropTypes.func,
};