import React from 'react';
import PropTypes from 'prop-types';

export default function CheckBox(props) {
  return (
    <label className="checkbox">
      <input
        value={props.checkboxItem}
        type="checkbox"
        onChange={props.handleCheckboxChange}
      />
      {props.checkboxItem}
    </label>
  );
}

CheckBox.propTypes = {
  key: PropTypes.string,
  checkboxItem: PropTypes.string,
  handleCheckboxChange: PropTypes.func,
};
