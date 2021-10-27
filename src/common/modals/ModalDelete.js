import React from 'react';
import { ReactComponent as AlertIcon } from '../../assets/icons/icon-alert.svg';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import './modal-delete.css';

const ModalDelete = ({ isShow, isLoading, onClose, onDelete, type, title }) => (
  <div className={`modal${isShow ? ' show' : ''}`} data-cy="modal-delete">
    <div className="backdrop" onClick={onClose} />
    <div className="modal-delete">
      <AlertIcon className="modal-delete__img" data-cy="modal-delete-icon" />
      <div className="modal-delete__message" data-cy="modal-delete-title">
        Apakah Anda yakin menghapus {type}
        <br />
        <b>&quot;{title}&quot;</b>
      </div>
      <div className="modal-delete__buttons">
        <Button color="secondary" onClick={onClose} data-cy="modal-delete-cancel-button">
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
);

export default ModalDelete;
