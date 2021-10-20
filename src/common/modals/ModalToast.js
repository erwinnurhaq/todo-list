import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

import { ReactComponent as InfoIcon } from 'assets/icons/icon-info.svg';
import { ReactComponent as AlertIcon } from 'assets/icons/icon-alert.svg';

function ModalToast({ isShow, onClose, message }) {
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
    <div className="modal" tabIndex="-1" ref={modalRef} data-cy="modal-information">
      <div className="modal-dialog modal-dialog-centered toast-modal" onClick={handleClose}>
        <div className="modal-content toast-content">
          <div data-cy="modal-information-icon">
            {message.includes('Gagal') ? <AlertIcon /> : <InfoIcon />}
          </div>
          <div data-cy="modal-information-title">{message}</div>
        </div>
      </div>
    </div>
  );
}

ModalToast.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
};
ModalToast.defaultProps = {
  message: '',
};

export default ModalToast;
