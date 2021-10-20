import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
const email = 'enurhaq@gmail.com';
const encodedEmail = encodeURIComponent(email);

const fetchActivities = () =>
  axios.get(`/activity-groups?email=${encodedEmail}`).then(res => res.data);

const addActivity = title => axios.post(`/activity-groups`, { title, email }).then(res => res.data);

const editActivity = (id, title) =>
  axios.patch(`/activity-groups/${id}`, { title }).then(res => res.data);

const deleteActivity = id => axios.delete(`/activity-groups/${id}`).then(res => res.data);

const fetchDetail = id => axios.get(`/activity-groups/${id}`).then(res => res.data);

const addTask = ({ activity_group_id, title, priority }) =>
  axios.post(`/todo-items`, { activity_group_id, title, priority }).then(res => res.data);

const editTask = ({ id, title, is_active, priority }) =>
  axios.patch(`/todo-items/${id}`, { title, is_active, priority }).then(res => res.data);

const deleteTask = id => axios.delete(`/todo-items/${id}`).then(res => res.data);

export {
  fetchActivities,
  addActivity,
  editActivity,
  deleteActivity,
  fetchDetail,
  addTask,
  editTask,
  deleteTask,
};
