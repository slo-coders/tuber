import React from 'react';
import PropTypes from 'prop-types';

export default function CheckBox(props) {
  return (
    <label className="checkbox">
      <input
        value={props.checkboxValue}
        name={props.checkboxItem}
        type="checkbox"
        onChange={props.handleCheckboxChange}
        style={{ borderRadius: '0px', marginRight: '8px' }}
      />
      {props.checkboxItem}
    </label>
  );
}

CheckBox.propTypes = {
  key: PropTypes.string,
  checkboxItem: PropTypes.string,
  checkboxValue: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
};
