import { SET_LOADING, SET_MODAL, CLEAR_MODAL } from '../types';

const initialState = { loading: false, modal: '', selected: {}, message: '' };

function commonReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_MODAL:
      return { ...state, loading: false, ...action.payload };
    case CLEAR_MODAL:
      return initialState;
    default:
      return state;
  }
}

export default commonReducer;
