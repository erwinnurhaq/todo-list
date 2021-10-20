import PropTypes from 'prop-types';

import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit-h.svg';
import Indicator from 'common/components/Indicator';

const TaskCard = ({ task, onDone, onEdit, onDelete }) => (
  <div className="col-12">
    <div className="task-card" data-cy="todo-item">
      <div className="task-wrapper">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={task.is_active === 0}
            onChange={ev => onDone(ev.target.checked ? 0 : 1)}
            data-cy="todo-item-checkbox"
          />
        </div>
        <Indicator priority={task.priority} data-cy="todo-item-priority-indicator" />
        <p data-cy="todo-item-title" className={task.is_active === 0 ? 'todo-done' : ''}>
          {task.title}
        </p>
        <button
          type="button"
          data-cy="todo-item-edit-button"
          className="task-card__edit-icon"
          onClick={onEdit}
        >
          <EditIcon />
        </button>
      </div>
      <button
        type="button"
        data-cy="todo-item-delete-button"
        className="task-card__delete-icon"
        onClick={onDelete}
      >
        <DeleteIcon />
      </button>
    </div>
  </div>
);

TaskCard.propTypes = {
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  onDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
