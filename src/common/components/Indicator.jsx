import React from 'react';
import PropTypes from 'prop-types';

function Indicator({ priority, ...props }) {
  return <div className={`priority-indicator ${priority}`} {...props} />;
}

Indicator.propTypes = {
  priority: PropTypes.string.isRequired,
};

export default Indicator;
