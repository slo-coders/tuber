import React from 'react';
import PropTypes from 'prop-types';

export default function Input(props) {
  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          value={props.value}
          name={props.name}
          onChange={props.handleInputChange}
          className="input"
          type={props.type}
          placeholder={props.placeholder}
          style={{ borderRadius: '0px' }}
        />
        <span className="icon is-small is-left">
          <i className={'fas fa-' + props.icon}></i>
        </span>
      </div>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  handleInputChange: PropTypes.func,
};
