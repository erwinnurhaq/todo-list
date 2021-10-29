import Axios from 'axios';
import { POPUP } from '../../common/constants/activity';
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
import { setIsLoading, setModal } from './common';

const axios = Axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const email = 'enurhaq@gmail.com';
const encodedEmail = encodeURIComponent(email);

const fetchActivities = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.get(`/activity-groups?email=${encodedEmail}`);
    dispatch({ type: SET_ACTIVITIES, payload: res.data.data });
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setModal(POPUP.TOAST, {}, 'Gagal mendapatkan activity.'));
  }
};

const addActivity = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(`/activity-groups`, { title: 'New Activity', email });
    dispatch({ type: ADD_ACTIVITY, payload: res.data });
    dispatch(fetchActivities());
  } catch {
    dispatch(setModal(POPUP.TOAST, {}, 'Gagal menambahkan activity baru.'));
  }
};

const deleteActivity = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await axios.delete(`/activity-groups/${id}`);
    dispatch({ type: DELETE_ACTIVITY, payload: id });
    dispatch(setModal(POPUP.TOAST, {}, 'Berhasil menghapus activity.'));
  } catch {
    dispatch(setModal(POPUP.TOAST, {}, 'Gagal menghapus activity.'));
  }
};

const fetchDetail = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.get(`/activity-groups/${id}`);
    dispatch({ type: SET_DETAIL_ACTIVITY, payload: res.data });
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setModal(POPUP.TOAST, {}, 'Gagal mendapatkan detail activity.'));
  }
};

const editActivity = (id, title) => async (dispatch) => {
  try {
    await axios.patch(`/activity-groups/${id}`, { title });
    dispatch({ type: UPDATE_ACTIVITY, payload: title });
  } catch {
    dispatch(setModal(POPUP.TOAST, {}, 'Gagal mengganti title activity.'));
  }
};

const addTask =
  ({ activity_group_id, title, priority }) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await axios.post(`/todo-items`, { activity_group_id, title, priority });
      dispatch({ type: ADD_TASK, payload: res.data });
      dispatch(setModal(POPUP.TOAST, {}, 'Berhasil menambahkan task baru.'));
    } catch {
      dispatch(setModal(POPUP.TOAST, {}, 'Gagal menambahkan task baru.'));
    }
  };

const editTask =
  ({ id, title, is_active, priority }) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      await axios.patch(`/todo-items/${id}`, { title, is_active, priority });
      dispatch({ type: UPDATE_TASK, payload: { id, title, is_active, priority } });
      dispatch(setModal(POPUP.TOAST, {}, 'Berhasil edit task.'));
    } catch {
      dispatch(setModal(POPUP.TOAST, {}, 'Gagal edit task.'));
    }
  };

const toggleTask =
  ({ id, title, is_active, priority }) =>
  async (dispatch) => {
    try {
      await axios.patch(`/todo-items/${id}`, { title, is_active, priority });
      dispatch({ type: UPDATE_TASK, payload: { id, title, is_active, priority } });
    } catch {
      dispatch(setModal(POPUP.TOAST, {}, 'Gagal edit task.'));
    }
  };

const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await axios.delete(`/todo-items/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
    dispatch(setModal(POPUP.TOAST, {}, 'Berhasil delete task.'));
  } catch {
    dispatch(setModal(POPUP.TOAST, {}, 'Gagal delete task.'));
  }
};

export {
  fetchActivities,
  addActivity,
  deleteActivity,
  fetchDetail,
  editActivity,
  addTask,
  editTask,
  toggleTask,
  deleteTask,
};
