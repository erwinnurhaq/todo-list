import PropTypes from 'prop-types';
import emptyItem from 'assets/images/empty-act.webp';

const Empty = ({ onClick }) => (
  <div className="empty-item" data-cy="activity-empty-state">
    <img src={emptyItem} alt="empty" onClick={onClick} />
  </div>
);

Empty.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Empty;
