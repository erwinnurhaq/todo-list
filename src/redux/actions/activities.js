import Axios from 'axios';
import { setIsLoading, setToast } from './common';

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
    setData(res.data.data);
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setToast('Gagal mendapatkan activity.'));
    dispatch(setIsLoading(false));
  }
};

const addActivity = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(`/activity-groups`, { title: 'New Activity', email });
    setData([res, ...data]);
    getActivities();
  } catch {
    dispatch(setToast('Gagal menambahkan activity baru.'));
    dispatch(setIsLoading(false));
  }
};

const deleteActivity = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await axios.delete(`/activity-groups/${id}`);
    setData(data.filter((i) => i.id !== id));
    dispatch(setToast('Berhasil menghapus activity.'));
    getActivities();
  } catch {
    dispatch(setToast('Gagal menghapus activity.'));
    dispatch(setIsLoading(false));
  }
};

const fetchDetail = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const res = await fetchDetail(params.id);
    setData(res);
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setToast('Gagal mendapatkan detail activity.'));
    dispatch(setIsLoading(false));
  }
};

const editActivity = (id, title) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await axios.patch(`/activity-groups/${id}`, { title });
    setData({ ...data, title });
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setToast('Gagal mengganti title activity.'));
    dispatch(setIsLoading(false));
  }
};

const addTask =
  ({ title, priority }) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const res = await addTask({ activity_group_id: params.id, title, priority });
      setData({ ...data, todo_items: [res, ...data.todo_items] });
      dispatch(setToast('Berhasil menambahkan task baru.'));
      dispatch(setIsLoading(false));
    } catch {
      dispatch(setToast('Gagal menambahkan task baru.'));
      dispatch(setIsLoading(false));
    }
  };

const editTask = (task) => async (dispatch, getState) => {
  try {
    const selectedId = getState();
    console.log(selectedId);
    dispatch(setIsLoading(true));
    await editTask(task);
    setData({
      ...data,
      todo_items: data.todo_items.map((i) => (i.id === task.id ? task : i)),
    });
    if (selected.id) dispatch(setToast('Berhasil edit task.'));
    dispatch(setIsLoading(false));
  } catch {
    if (selected.id) dispatch(setToast('Gagal edit task.'));
    dispatch(setIsLoading(false));
  }
};

const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    await deleteTask(id);
    setData({
      ...data,
      todo_items: data.todo_items.filter((i) => i.id !== id),
    });
    dispatch(setToast('Berhasil delete task.'));
    dispatch(setIsLoading(false));
  } catch {
    dispatch(setToast('Gagal delete task.'));
    dispatch(setIsLoading(false));
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
  deleteTask,
};
