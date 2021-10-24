import { lazy, Suspense, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Context } from 'layouts';
import sortString from 'utils/sortString';
import { fetchDetail, addTask, editTask, deleteTask, editActivity } from 'utils/api';
import { SORT } from 'common/constants/activity';
import ModalTaskForm from 'common/modals/ModalTaskForm';
import ModalDelete from 'common/modals/ModalDelete';
import Header from './components/Header';

const TaskCard = lazy(() => import('./components/TaskCard'));
const Empty = lazy(() => import('common/components/Empty'));

function ActivityDetail() {
  const params = useParams();

  const [sort, setSort] = useState(SORT.NEWEST);
  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    selected,
    modal,
    showModal,
    clearModal,
    setToast,
  } = useContext(Context);

  const handleSort = useCallback(
    (a, b) => {
      switch (sort) {
        case SORT.NEWEST:
          return b.id - a.id;
        case SORT.OLDEST:
          return a.id - b.id;
        case SORT.ASC:
          return sortString(a.title, b.title);
        case SORT.DESC:
          return sortString(b.title, a.title);
        case SORT.DONE:
          return a.is_active - b.is_active;
        case SORT.NOTDONE:
          return b.is_active - a.is_active;
        default:
          return null;
      }
    },
    [sort]
  );

  const todos = useMemo(() => (data?.todo_items ? data.todo_items.sort(handleSort) : []), [
    data,
    handleSort,
  ]);

  useEffect(() => {
    getActivityDetail();
  }, []); // eslint-disable-line

  async function getActivityDetail() {
    try {
      setIsLoading(true);
      const res = await fetchDetail(params.id);
      setData(res);
      setIsLoading(false);
    } catch {
      setToast('Gagal mendapatkan detail activity.');
      setIsLoading(false);
    }
  }

  async function handleEditTitle(title) {
    try {
      setIsLoading(true);
      await editActivity(params.id, title);
      setData({ ...data, title });
      setIsLoading(false);
    } catch {
      setToast('Gagal mengganti title activity.');
      setIsLoading(false);
    }
  }

  async function handleAddTask({ title, priority }) {
    try {
      setIsLoading(true);
      const res = await addTask({ activity_group_id: params.id, title, priority });
      setData({ ...data, todo_items: [res, ...data.todo_items] });
      setToast('Berhasil menambahkan task baru.');
      setIsLoading(false);
    } catch {
      setToast('Gagal menambahkan task baru.');
      setIsLoading(false);
    }
  }

  async function handleEditTask(task) {
    try {
      setIsLoading(true);
      await editTask(task);
      setData({
        ...data,
        todo_items: data.todo_items.map(i => (i.id === task.id ? task : i)),
      });
      if (selected.id) setToast('Berhasil edit task.');
      setIsLoading(false);
    } catch {
      if (selected.id) setToast('Gagal edit task.');
      setIsLoading(false);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setIsLoading(true);
      await deleteTask(id);
      setData({
        ...data,
        todo_items: data.todo_items.filter(i => i.id !== id),
      });
      setToast('Berhasil delete task.');
      setIsLoading(false);
    } catch {
      setToast('Gagal delete task.');
      setIsLoading(false);
    }
  }

  return (
    <section className="container">
      <Header
        title={data?.title}
        sort={sort}
        setSort={setSort}
        onAddTask={() => showModal('TASK')}
        onEditTitle={handleEditTitle}
      />
      <div className="row task-row">
        {todos.length === 0 && !isLoading && (
          <Suspense fallback={null}>
            <Empty type="list item" onClick={() => showModal('TASK')} data-cy="todo-empty-state" />
          </Suspense>
        )}
        {todos.length > 0 &&
          todos.map(task => (
            <Suspense key={task.id} fallback={null}>
              <TaskCard
                task={task}
                onDone={val => handleEditTask({ ...task, is_active: val })}
                onEdit={() => showModal('TASK', task)}
                onDelete={() => showModal('DELETE', task)}
              />
            </Suspense>
          ))}
      </div>
      <ModalDelete
        isShow={modal === 'DELETE'}
        isLoading={isLoading}
        onClose={clearModal}
        onDelete={() => handleDeleteTask(selected.id)}
        type="list item"
        title={selected.title}
      />
      <ModalTaskForm
        isShow={modal === 'TASK'}
        isLoading={isLoading}
        onClose={clearModal}
        onSave={task => (selected.id ? handleEditTask(task) : handleAddTask(task))}
        task={selected.id ? selected : null}
      />
    </section>
  );
}

export default ActivityDetail;
