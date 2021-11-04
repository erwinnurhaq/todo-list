import { SET_THEME } from '../types';

export const setTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: theme });
};
