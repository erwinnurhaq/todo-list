import PropTypes from 'prop-types';
import emptyItem from 'assets/images/empty-item.webp';

const Empty = ({ onClick }) => (
  <div className="empty-item" data-cy="todo-empty-state">
    <img src={emptyItem} alt="empty" id="TextEmptyTodo" onClick={onClick} />
  </div>
);

Empty.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Empty;
