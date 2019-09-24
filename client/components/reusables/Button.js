import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <div
      className={props.divStyle}
      style={
        props.customDivStyle ? props.customDivStyle : { alignItems: 'center' }
      }
    >
      <a
        value={props.value}
        className={'button ' + props.buttonStyle}
        onClick={props.handleClick}
        disabled={props.disabled}
        style={
          props.customButtonStyle
            ? props.customButtonStyle
            : { alignItems: 'center' }
        }
      >
        {props.buttonText}
      </a>
    </div>
  );
}

Button.propTypes = {
  customButtonStyle: PropTypes.string,
  customDivStyle: PropTypes.string,
  divStyle: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.string,
  handleClick: PropTypes.func,
};
