import React from 'react';
import emptyAct from '../../assets/images/empty-act.webp';
import emptyTask from '../../assets/images/empty-item.webp';
import './empty.css';

const Empty = ({ onClick, type, ...props }) => (
  <div className="empty-item" {...props}>
    <img
      loading="lazy"
      src={type === 'activity' ? emptyAct : emptyTask}
      alt="empty"
      onClick={onClick}
    />
  </div>
);

export default Empty;
