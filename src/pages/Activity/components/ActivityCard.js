import PropTypes from 'prop-types';

import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';
import getDateString from 'utils/getDateSting';

const ActivityCard = ({ activity, onViewDetail, onDelete }) => (
  <div className="activity-card" data-cy="activity-item">
    <div role="button" className="activity-card__content" onClick={onViewDetail}>
      <h4 data-cy="activity-item-title">{activity.title}</h4>
    </div>
    <div className="activity-card__footer">
      <p data-cy="activity-item-date">{getDateString(activity.created_at, { isDateOnly: true })}</p>
      <button type="button" onClick={onDelete} data-cy="activity-item-delete-button">
        <DeleteIcon />
      </button>
    </div>
  </div>
);

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
  onViewDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActivityCard;
