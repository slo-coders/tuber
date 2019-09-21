import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <div className="buttons">
      <a
        value={props.value}
        className={'button ' + props.buttonStyle}
        onClick={props.handleClick}
        disabled={props.disabled}
      >
        {props.buttonText}
      </a>
    </div>
  );
}

Button.propTypes = {
  disabled: PropTypes.string,
  value: PropTypes.string,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.string,
  handleClick: PropTypes.func,
};
