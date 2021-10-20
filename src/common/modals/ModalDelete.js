import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

import { ReactComponent as AlertIcon } from 'assets/icons/icon-alert.svg';
import Button from 'common/components/Button';
import Spinner from 'common/components/Spinner';

function ModalDelete({ isShow, isLoading, onClose, onDelete, type, title }) {
  const modalRef = useRef(null);
  const modal = useRef(null);

  const toggleModal = () => (isShow ? modal.current.show() : modal.current.hide());
  const handleClose = () => modal.current.hide();

  useEffect(() => {
    modal.current = new Modal(modalRef.current);
    modalRef.current.addEventListener('hide.bs.modal', onClose);
  }, []); // eslint-disable-line

  useEffect(() => {
    toggleModal();
  }, [isShow]); // eslint-disable-line

  return (
    <div
      className="modal"
      data-cy="modal-delete"
      tabIndex="-1"
      data-bs-backdrop={isLoading ? 'static' : true}
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered delete-modal">
        <div className="modal-content delete-form">
          <AlertIcon className="delete-form__img" data-cy="modal-delete-icon" />
          <div className="delete-form__message" data-cy="modal-delete-title">
            Apakah Anda yakin menghapus {type}
            <br />
            <b>&quot;{title}&quot;</b>
          </div>
          <div className="delete-form__buttons">
            <Button
              color="secondary"
              disabled={isLoading}
              onClick={handleClose}
              data-cy="modal-delete-cancel-button"
            >
              Batal
            </Button>
            <Button
              color="danger"
              disabled={isLoading}
              onClick={onDelete}
              data-cy="modal-delete-confirm-button"
            >
              {isLoading ? <Spinner /> : <p>Hapus</p>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalDelete.propTypes = {
  isShow: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
};
ModalDelete.defaultProps = {
  title: '',
};

export default ModalDelete;
