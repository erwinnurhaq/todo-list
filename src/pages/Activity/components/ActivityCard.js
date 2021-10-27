import React from 'react';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/icon-delete.svg';
import getDateString from '../../../utils/getDateSting';
import './activity-card.css';

const ActivityCard = ({ activity, onViewDetail, onDelete }) => (
  <div className="activity-card" data-cy="activity-item">
    <div role="button" className="activity-card__content" onClick={onViewDetail}>
      <h4 data-cy="activity-item-title">{activity.title}</h4>
    </div>
    <div className="activity-card__footer">
      <p data-cy="activity-item-date">{getDateString(activity.created_at)}</p>
      <button type="button" onClick={onDelete} data-cy="activity-item-delete-button">
        <DeleteIcon />
      </button>
    </div>
  </div>
);

export default ActivityCard;
