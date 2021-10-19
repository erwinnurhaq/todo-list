import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'bootstrap/js/dist/modal';

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
    <div className="modal" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered toast-modal" onClick={handleClose}>
        <div className="modal-content toast-content">{message}</div>
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
