import { SET_THEME } from '../types';

function themeReducer(state = 'light', action) {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
}

export default themeReducer;
