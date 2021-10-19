import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

import { PRIORITY } from 'common/constants/activity';
import Button from 'common/components/Button';
import Spinner from 'common/components/Spinner';
import PriorityDropdown from 'common/components/PriorityDropdown';

const initialForm = { priority: PRIORITY.VERYHIGH, title: '', is_active: 1 };

function ModalTaskForm({ isShow, isLoading, onClose, onSave, task }) {
  const [form, setForm] = useState(initialForm);
  const modalRef = useRef(null);
  const modal = useRef(null);

  const toggleModal = () => (isShow ? modal.current.show() : modal.current.hide());
  const handleClose = () => modal.current.hide();
  const handleSave = ev => {
    ev.preventDefault();
    onSave(form);
  };

  useEffect(() => {
    modal.current = new Modal(modalRef.current);
    modalRef.current.addEventListener('hide.bs.modal', () => {
      setForm(initialForm);
      onClose();
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    toggleModal();
    if (isShow && task) {
      setForm({
        priority: task.priority,
        title: task.title,
        is_active: task.is_active,
      });
    }
  }, [isShow]); // eslint-disable-line

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      data-bs-backdrop={isLoading ? 'static' : true}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered task-modal">
        <form className="modal-content task-form" onSubmit={handleSave}>
          <div className="modal-header">
            <h5 className="modal-title">{task ? 'Edit Item' : 'Tambah List Item'}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              disabled={isLoading}
            />
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="form-task-name" className="form-label">
                NAMA LIST ITEM
              </label>
              <input
                type="text"
                className="form-control"
                id="form-task-name"
                placeholder="Tambahkan nama list item"
                value={form.title}
                onChange={ev => setForm({ ...form, title: ev.target.value })}
                disabled={isLoading}
              />
            </div>
            <label className="form-label">PRIORITY</label>
            <PriorityDropdown
              value={form.priority}
              onChange={val => setForm({ ...form, priority: val })}
            />
          </div>
          <div className="modal-footer">
            <Button type="submit" color="primary" disabled={isLoading || form.title.length === 0}>
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
