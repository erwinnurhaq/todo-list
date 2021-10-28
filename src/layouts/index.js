import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearModal } from '../redux/actions/common';
import './index.css';

const ModalToast = React.lazy(() => import('../common/modals/ModalToast'));

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
      <React.Suspense fallback={null}>
        <ModalToast isShow={!!message} message={message} onClose={() => dispatch(clearModal())} />
      </React.Suspense>
    </React.Fragment>
  );
}

export default Layout;
