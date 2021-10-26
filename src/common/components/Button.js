import React from 'react';
import './button.css';

const Button = ({ type, color, children, ...props }) => (
  <button type={type} className={`common-button ${color}`} {...props}>
    {children}
  </button>
);

export default Button;
