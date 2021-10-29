import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearModal } from '../redux/actions/common';
import ModalToast from '../common/modals/ModalToast';
import './index.css';

function Layout({ children }) {
  const { message } = useSelector((state) => state.common);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <header>
        <div className="container" data-cy="header-background">
          <h2 data-cy="header-title">TO DO LIST APP</h2>
        </div>
      </header>
      {children}
      <ModalToast isShow={!!message} message={message} onClose={() => dispatch(clearModal())} />
    </React.Fragment>
  );
}

export default Layout;
