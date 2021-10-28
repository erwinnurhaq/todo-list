const setIsLoading = (bool) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: bool });
};

const showModal = (type, item) => (dispatch) => {
  if (item) dispatch({ type: SET_SELECTED, payload: item });
  dispatch({ type: SET_MODAL, payload: type });
};

const clearModal = () => (dispatch) => {
  dispatch({ type: CLEAR_MODAL });
};

const setToast = (message) => (dispatch) => {
  dispatch({ type: SET_TOAST, payload: message });
};

export { setIsLoading, showModal, clearModal, setToast };
