import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import ModalToast from 'common/modals/ModalToast';

export const Context = createContext();

const initialState = {
  data: null,
  isLoading: false,
  selected: {},
  modal: '',
  toast: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'reset.state':
      return initialState;
    case 'set.data':
      return { ...state, data: action.payload };
    case 'set.is.loading':
      return { ...state, isLoading: action.payload };
    case 'set.selected':
      return { ...state, selected: action.payload };
    case 'set.modal':
      return { ...state, modal: action.payload };
    case 'clear.modal':
      return { ...state, modal: '', selected: {} };
    case 'set.toast':
      return { ...state, modal: '', selected: {}, toast: action.payload };
    default:
      return state;
  }
}

function Layout({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function resetState() {
    dispatch({ type: 'reset.state' });
  }
  function setData(data) {
    dispatch({ type: 'set.data', payload: data });
  }
  function setIsLoading(bool) {
    dispatch({ type: 'set.is.loading', payload: bool });
  }
  function showModal(type, item) {
    if (item) dispatch({ type: 'set.selected', payload: item });
    dispatch({ type: 'set.modal', payload: type });
  }
  function clearModal() {
    dispatch({ type: 'clear.modal' });
  }
  function setToast(message) {
    dispatch({ type: 'set.toast', payload: message });
  }

  return (
    <Context.Provider
      value={{
        ...state,
        setData,
        setIsLoading,
        showModal,
        clearModal,
        setToast,
        resetState,
      }}
    >
      <header>
        <div className="container" data-cy="header-background">
          <h2 data-cy="header-title">TO DO LIST APP</h2>
        </div>
      </header>
      {children}
      <ModalToast isShow={!!state.toast} message={state.toast} onClose={() => setToast('')} />
    </Context.Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
Layout.defaultProps = {
  children: '',
};

export default Layout;
