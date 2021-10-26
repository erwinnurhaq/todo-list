const baseURL = 'https://todo.api.devcode.gethired.id';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const email = 'enurhaq@gmail.com';
const encodedEmail = encodeURIComponent(email);

const fetchActivities = () =>
  fetch(`${baseURL}/activity-groups?email=${encodedEmail}`, { method: 'GET', headers }).then(res =>
    res.json()
  );

const addActivity = title =>
  fetch(`${baseURL}/activity-groups`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ title, email }),
  }).then(res => res.json());

const editActivity = (id, title) =>
  fetch(`${baseURL}/activity-groups/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ title }),
  }).then(res => res.json());

const deleteActivity = id =>
  fetch(`${baseURL}/activity-groups/${id}`, { method: 'DELETE', headers }).then(res => res.json());

const fetchDetail = id =>
  fetch(`${baseURL}/activity-groups/${id}`, { method: 'GET', headers }).then(res => res.json());

const addTask = ({ activity_group_id, title, priority }) =>
  fetch(`${baseURL}/todo-items`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ activity_group_id, title, priority }),
  }).then(res => res.json());

const editTask = ({ id, title, is_active, priority }) =>
  fetch(`${baseURL}/todo-items/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ title, is_active, priority }),
  }).then(res => res.json());

const deleteTask = id =>
  fetch(`${baseURL}/todo-items/${id}`, { method: 'DELETE', headers }).then(res => res.json());

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
