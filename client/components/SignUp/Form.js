import React from 'react';
import PropTypes from 'prop-types';

export default function Form(props) {
  return (
    <form>
      <div className="field">
        <div className="control">
          <input
            value={props.firstName}
            name="firstName"
            onChange={props.handleChange}
            className="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            value={props.lastName}
            name="lastName"
            onChange={props.handleChange}
            className="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            value={props.email}
            name="email"
            onChange={props.handleChange}
            className="input"
            type="email"
            placeholder="Email Address"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            value={props.password1}
            name="password1"
            onChange={props.handleChange}
            className="input"
            type="password"
            placeholder="Choose a password"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            value={props.password2}
            name="password2"
            onChange={props.handleChange}
            className="input"
            type="password"
            placeholder="Re-enter password"
          />
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password1: PropTypes.string,
  password2: PropTypes.string,
  handleChange: PropTypes.func,
};
