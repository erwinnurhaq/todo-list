import React from 'react';
import { ReactComponent as InfoIcon } from '../../assets/icons/icon-info.svg';
import { ReactComponent as AlertIcon } from '../../assets/icons/icon-alert.svg';
import './modal-toast.css';

const ModalToast = ({ isShow, onClose, message }) => (
  <div className={`modal${isShow ? ' show' : ''}`} data-cy="modal-information">
    <div className="backdrop" onClick={onClose} />
    <div className="modal-toast">
      <div data-cy="modal-information-icon">
        {message.includes('Gagal') ? <AlertIcon /> : <InfoIcon />}
      </div>
      <div data-cy="modal-information-title">{message}</div>
    </div>
  </div>
);

export default ModalToast;
