import {
  SET_ACTIVITIES,
  ADD_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  SET_DETAIL_ACTIVITY,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../types';

const initialState = { activities: [], detail: {} };

function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVITIES:
      return { ...state, activities: action.payload };
    case ADD_ACTIVITY:
      return { ...state, activities: [action.payload, ...state.activities] };
    case DELETE_ACTIVITY:
      return { ...state, activities: state.activities.filter((i) => i.id !== action.payload) };
    case UPDATE_ACTIVITY:
      return { ...state, detail: { ...state.detail, title: action.payload } };
    case SET_DETAIL_ACTIVITY:
      return { ...state, detail: action.payload };
    case ADD_TASK:
      return {
        ...state,
        detail: { ...state.detail, todo_items: [action.payload, ...state.detail.todo_items] },
      };
    case DELETE_TASK:
      return {
        ...state,
        detail: {
          ...state.detail,
          todo_items: state.detail.todo_items.filter((i) => i.id !== action.payload),
        },
      };
    case UPDATE_TASK:
      return {
        ...state,
        detail: {
          ...state.detail,
          todo_items: state.detail.todo_items.map((i) =>
            i.id === action.payload.id ? action.payload : i
          ),
        },
      };
    default:
      return state;
  }
}

export default activitiesReducer;
