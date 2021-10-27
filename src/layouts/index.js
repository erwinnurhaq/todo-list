import React from 'react';
import './index.css';

const ModalToast = React.lazy(() => import('../common/modals/ModalToast'));

export const Context = React.createContext();

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
  const [state, dispatch] = React.useReducer(reducer, initialState);

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
      <React.Suspense fallback={null}>
        <ModalToast isShow={!!state.toast} message={state.toast} onClose={() => setToast('')} />
      </React.Suspense>
    </Context.Provider>
  );
}

export default Layout;
