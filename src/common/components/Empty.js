import PropTypes from 'prop-types';
import emptyAct from 'assets/images/empty-act.webp';
import emptyTask from 'assets/images/empty-item.webp';

const Empty = ({ onClick, type, ...props }) => (
  <div className="empty-item" {...props}>
    <img src={type === 'activity' ? emptyAct : emptyTask} alt="empty" onClick={onClick} />
  </div>
);

Empty.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default Empty;
