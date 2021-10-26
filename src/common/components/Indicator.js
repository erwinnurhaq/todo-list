import React from 'react';
import './indicator.css';

const Indicator = ({ priority, ...props }) => (
  <div className={`priority-indicator ${priority}`} {...props} />
);

export default Indicator;
