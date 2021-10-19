import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ModalTaskForm from 'common/modals/ModalTaskForm';
import ModalDelete from 'common/modals/ModalDelete';
import ModalToast from 'common/modals/ModalToast';
import Header from './components/Header';
import TaskCard from './components/TaskCard';

const data = [
  {
    activity_group_id: 1,
    id: 1,
    is_active: 1,
    priority: 'very-high',
    title: 'test1',
  },
  {
    activity_group_id: 2,
    id: 2,
    is_active: 0,
    priority: 'high',
    title: 'test1',
  },
  {
    activity_group_id: 3,
    id: 3,
    is_active: 1,
    priority: 'low',
    title: 'test1',
  },
];

function ActivityDetail() {
  const params = useParams();
  const [selectedTask, setSelectedTask] = useState({});
  const [showedPopup, setShowedPopup] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const clearPopup = () => {
    setShowedPopup('');
    setSelectedTask({});
  };
  const handlePopup = ({ type, task, message }) => {
    if (task) setSelectedTask(task);
    if (message) setToastMessage(message);
    setShowedPopup(type);
  };
  const handleEditTitle = val => {
    console.log(params.id, val);
  };
  const handleAddTask = () => {};
  const handleEditTask = () => {};
  const handleDeleteTask = () => {};

  return (
    <section className="container">
      <Header
        isLoading={false}
        title={'activity'}
        onAddTask={() => handlePopup({ type: 'TASK' })}
        onEditTitle={handleEditTitle}
      />
      <div className="row activity-row">
        {data.map(task => (
          <div key={task.id} className="col-12">
            <TaskCard
              key={task.id}
              task={task}
              onDone={(val) => handleEditTask({ ...task, is_active: val })}
              onEdit={() => handlePopup({ type: 'TASK', task })}
              onDelete={() => handlePopup({ type: 'DELETE', task })}
            />
          </div>
        ))}
      </div>
      <ModalToast isShow={showedPopup === 'TOAST'} message={toastMessage} onClose={clearPopup} />
      <ModalDelete
        isShow={showedPopup === 'DELETE'}
        isLoading={false}
        onClose={clearPopup}
        onDelete={handleDeleteTask}
        type="task"
        title={selectedTask.title}
      />
      <ModalTaskForm
        isShow={showedPopup === 'TASK'}
        isLoading={false}
        onClose={clearPopup}
        onSave={task => (selectedTask.id ? handleAddTask(task) : handleEditTask(task))}
        task={selectedTask.id ? selectedTask : null}
      />
    </section>
  );
}

export default ActivityDetail;
