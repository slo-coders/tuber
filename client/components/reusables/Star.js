import React from 'react';
import PropTypes from 'prop-types';

export default function Star(props) {
  return <i className={props.starType} />;
}

Star.propTypes = {
  starType: PropTypes.string,
  filled: PropTypes.string,
};
