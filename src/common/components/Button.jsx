/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function checkType(type) {
  switch (type) {
    case 'primary':
      return 'btn-primary';
    case 'secondary':
      return 'btn-secondary';
    case 'danger':
      return 'btn-danger';
    default:
      return '';
  }
}

const Button = ({ type, color, children, ...props }) => (
  <button type={type} className={`common-button btn ${checkType(color)}`} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
Button.defaultProps = {
  type: 'button',
  color: '',
  children: 'Button',
};

export default Button;
