import React from 'react';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/icon-delete.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/icon-edit-2.svg';
import Indicator from '../../../common/components/Indicator';
import './task-card.css';

const TaskCard = ({ task, onDone, onEdit, onDelete }) => (
  <div className="task-card" data-cy="todo-item">
    <div className="task-wrapper">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={task.is_active === 0}
          onChange={(ev) => onDone(ev.target.checked ? 0 : 1)}
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
);

export default TaskCard;
