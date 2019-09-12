import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  return (
    <div className="buttons">
      <a className="button is-primary" onClick={props.handleSubmit}>
        Submit
      </a>
    </div>
  );
}

Button.propTypes = {
  handleSubmit: PropTypes.func,
};
