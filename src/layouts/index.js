import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteActivity, deleteTask } from '../redux/actions/activities';
import { clearModal } from '../redux/actions/common';
import { setTheme } from '../redux/actions/theme';
import { POPUP } from '../common/constants/activity';
import ModalToast from '../common/modals/ModalToast';
import ModalDelete from '../common/modals/ModalDelete';
import './index.css';
import ThemeToggle from '../common/components/ThemeToggle';

function Layout({ children }) {
  const { loading, modal, selected, message } = useSelector((state) => state.common);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme || 'dark');
  }, [theme]);

  return (
    <React.Fragment>
      <header>
        <div className="container container-main-header" data-cy="header-background">
          <h2 data-cy="header-title">TO DO LIST APP</h2>
          <ThemeToggle checked={theme === 'light'} onChange={toggleTheme} />
        </div>
      </header>
      {children}
      <ModalToast isShow={!!message} message={message} onClose={() => dispatch(clearModal())} />
      <ModalDelete
        isShow={modal === POPUP.DELETE_ACT || modal === POPUP.DELETE_TASK}
        type={modal === POPUP.DELETE_ACT ? 'activity' : 'list item'}
        isLoading={loading}
        title={selected.title}
        onClose={() => dispatch(clearModal())}
        onDelete={() =>
          modal === POPUP.DELETE_ACT
            ? dispatch(deleteActivity(selected.id))
            : dispatch(deleteTask(selected.id))
        }
      />
    </React.Fragment>
  );
}

export default Layout;
