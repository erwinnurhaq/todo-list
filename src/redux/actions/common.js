import { SET_LOADING, SET_MODAL, CLEAR_MODAL } from '../types';

const setIsLoading = (bool) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: bool });
};

const setModal =
  (modal = '', selected = {}, message = '') =>
  (dispatch) => {
    dispatch({ type: SET_MODAL, payload: { modal, selected, message } });
  };

const clearModal = () => (dispatch) => {
  dispatch({ type: CLEAR_MODAL });
};

export { setIsLoading, setModal, clearModal };
