import React from 'react';
import { PRIORITY } from '../constants/activity';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import PriorityDropdown from '../components/PriorityDropdown';
import './modal-task.css';

const initialForm = { priority: PRIORITY.VERYHIGH, title: '', is_active: 1 };

function ModalTaskForm({ isShow, isLoading, onClose, onSave, task }) {
  const [form, setForm] = React.useState(initialForm);

  const handleSave = (ev) => {
    ev.preventDefault();
    onSave(form);
  };

  React.useEffect(() => {
    if (isShow && task) {
      setForm({
        id: task.id,
        priority: task.priority,
        title: task.title,
        is_active: task.is_active,
      });
    } else {
      setForm(initialForm);
    }
  }, [isShow]); // eslint-disable-line

  return (
    <div className={`modal${isShow ? ' show' : ''}`} data-cy="modal-add">
      <div className="backdrop" onClick={onClose} />
      <form className="modal-task" onSubmit={handleSave}>
        <div className="modal-task__header">
          <h5 data-cy="modal-add-title">{task ? 'Edit Item' : 'Tambah List Item'}</h5>
          <button type="button" data-cy="modal-add-close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-task__body">
          <div className="modal-task__row">
            <label className="modal-task__row-label" data-cy="modal-add-name-title">
              NAMA LIST ITEM
            </label>
            <input
              type="text"
              className="form-control"
              data-cy="modal-add-name-input"
              placeholder="Tambahkan nama list item"
              value={form.title}
              onChange={(ev) => setForm({ ...form, title: ev.target.value })}
            />
          </div>
          <div className="modal-task__row">
            <label className="modal-task__row-label" data-cy="modal-add-priority-title">
              PRIORITY
            </label>
            <PriorityDropdown
              value={form.priority}
              onChange={(val) => setForm({ ...form, priority: val })}
            />
          </div>
        </div>
        <div className="modal-task__footer">
          <Button
            type="submit"
            color="primary"
            disabled={form.title.length === 0}
            data-cy="modal-add-save-button"
          >
            {isLoading ? <Spinner /> : <p>Simpan</p>}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ModalTaskForm;
