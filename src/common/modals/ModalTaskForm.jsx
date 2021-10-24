import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

import { PRIORITY } from '../constants/activity';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import PriorityDropdown from '../components/PriorityDropdown';

const initialForm = { priority: PRIORITY.VERYHIGH, title: '', is_active: 1 };

function ModalTaskForm({ isShow, isLoading, onClose, onSave, task }) {
  const [form, setForm] = React.useState(initialForm);
  const modalRef = React.useRef(null);
  const modal = React.useRef(null);

  const toggleModal = () => (isShow ? modal.current.show() : modal.current.hide());
  const handleClose = () => modal.current.hide();
  const handleSave = ev => {
    ev.preventDefault();
    onSave(form);
  };

  React.useEffect(() => {
    modal.current = new Modal(modalRef.current);
    modalRef.current.addEventListener('hide.bs.modal', () => {
      setForm(initialForm);
      onClose();
    });
  }, []); // eslint-disable-line

  React.useEffect(() => {
    toggleModal();
    if (isShow && task) {
      setForm({
        id: task.id,
        priority: task.priority,
        title: task.title,
        is_active: task.is_active,
      });
    }
  }, [isShow]); // eslint-disable-line

  return (
    <div
      className="modal"
      data-cy="modal-add"
      tabIndex="-1"
      data-bs-backdrop={isLoading ? 'static' : true}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered task-modal">
        <form className="modal-content task-form" onSubmit={handleSave}>
          <div className="modal-header">
            <h5 data-cy="modal-add-title" className="modal-title">
              {task ? 'Edit Item' : 'Tambah List Item'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-cy="modal-add-close-button"
              onClick={handleClose}
              disabled={isLoading}
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="form-task-name" className="form-label" data-cy="modal-add-name-title">
                NAMA LIST ITEM
              </label>
              <input
                type="text"
                className="form-control"
                data-cy="modal-add-name-input"
                id="form-task-name"
                placeholder="Tambahkan nama list item"
                value={form.title}
                onChange={ev => setForm({ ...form, title: ev.target.value })}
                disabled={isLoading}
              />
            </div>
            <label className="form-label" data-cy="modal-add-priority-title">
              PRIORITY
            </label>
            <PriorityDropdown
              value={form.priority}
              onChange={val => setForm({ ...form, priority: val })}
            />
          </div>
          <div className="modal-footer">
            <Button
              type="submit"
              color="primary"
              disabled={isLoading || form.title.length === 0}
              data-cy="modal-add-save-button"
            >
              {isLoading ? <Spinner /> : <p>Simpan</p>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

ModalTaskForm.propTypes = {
  isShow: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  task: PropTypes.objectOf(PropTypes.any),
};
ModalTaskForm.defaultProps = {
  task: null,
};

export default ModalTaskForm;
