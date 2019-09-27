import React from 'react';
import PropTypes from 'prop-types';

export default function Title(props) {
  return (
    <section
      className="hero"
      style={props.center ? { textAlign: 'center' } : {}}
    >
      <div
        className="hero-body"
        style={
          props.style
            ? props.style
            : { paddingBottom: '0px', paddingTop: '30px' }
        }
      >
        <div className="container">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            {props.largeText}
          </h1>
          <p>{props.smallText}</p>
        </div>
      </div>
    </section>
  );
}

Title.propTypes = {
  largeText: PropTypes.string,
  smallText: PropTypes.string,
  style: PropTypes.object,
};
