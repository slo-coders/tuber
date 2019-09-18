import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/fontawesome-free-solid';
import { faStar as farStar } from '@fortawesome/fontawesome-free-regular';
import PropTypes from 'prop-types';

export default function Star(props) {
  return (
    <a value={props.value}>
      <FontAwesomeIcon icon={props.filled ? fasStar : farStar} />
    </a>
  );
}

Star.propTypes = {
  value: PropTypes.string,
  filled: PropTypes.string,
};
