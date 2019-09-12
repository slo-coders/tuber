import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <div className="buttons">
      <a className={'button ' + props.buttonStyle} onClick={props.handleClick}>
        {props.buttonText}
      </a>
    </div>
  );
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonStyle: PropTypes.string,
  handleClick: PropTypes.func,
};
