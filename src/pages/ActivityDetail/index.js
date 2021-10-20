import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import sortString from 'utils/sortString';
import { fetchDetail, addTask, editTask, deleteTask, editActivity } from 'utils/api';
import { SORT } from 'common/constants/activity';
import useActivityState from 'common/hooks/useActivityState';
import Header from './components/Header';

const ModalTaskForm = lazy(() => import('common/modals/ModalTaskForm'));
const ModalDelete = lazy(() => import('common/modals/ModalDelete'));
const ModalToast = lazy(() => import('common/modals/ModalToast'));
const Empty = lazy(() => import('./components/Empty'));
const TaskCard = lazy(() => import('./components/TaskCard'));

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
    toast,
    setToast,
  } = useActivityState();

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

  const todos = useMemo(() => (data ? data.todo_items.sort(handleSort) : []), [data, handleSort]);

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
      setData(prev => ({ ...prev, title }));
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
      setData(prev => ({ ...prev, todo_items: [res, ...prev.todo_items] }));
      clearModal();
      setToast('Berhasil menambahkan task baru.');
      setIsLoading(false);
    } catch {
      clearModal();
      setToast('Gagal menambahkan task baru.');
      setIsLoading(false);
    }
  }

  async function handleEditTask(task) {
    try {
      setIsLoading(true);
      await editTask(task);
      setData(prev => ({
        ...prev,
        todo_items: prev.todo_items.map(i => (i.id === task.id ? task : i)),
      }));
      if (selected.id) {
        clearModal();
        setToast('Berhasil edit task.');
      }
      setIsLoading(false);
    } catch {
      if (selected.id) {
        clearModal();
        setToast('Gagal edit task.');
      }
      setIsLoading(false);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setIsLoading(true);
      await deleteTask(id);
      setData(prev => ({
        ...prev,
        todo_items: prev.todo_items.filter(i => i.id !== id),
      }));
      clearModal();
      setToast('Berhasil delete task.');
      setIsLoading(false);
    } catch {
      clearModal();
      setToast('Gagal delete task.');
      setIsLoading(false);
    }
  }

  return (
    <section className="container">
      <Header
        isLoading={isLoading}
        title={data?.title}
        sort={sort}
        setSort={setSort}
        onAddTask={() => showModal('TASK')}
        onEditTitle={handleEditTitle}
      />
      <div className="row activity-row">
        {todos.length === 0 && !isLoading && (
          <Suspense fallback={null}>
            <Empty onClick={() => showModal('TASK')} />
          </Suspense>
        )}
        {todos.length > 0 &&
          todos.map(task => (
            <Suspense fallback={null}>
              <TaskCard
                key={task.id}
                task={task}
                onDone={val => handleEditTask({ ...task, is_active: val })}
                onEdit={() => showModal('TASK', task)}
                onDelete={() => showModal('DELETE', task)}
              />
            </Suspense>
          ))}
      </div>
      <Suspense fallback={null}>
        <ModalToast isShow={!!toast} message={toast} onClose={() => setToast('')} />
        <ModalDelete
          isShow={modal === 'DELETE'}
          isLoading={isLoading}
          onClose={clearModal}
          onDelete={() => handleDeleteTask(selected.id)}
          type="task"
          title={selected.title}
        />
        <ModalTaskForm
          isShow={modal === 'TASK'}
          isLoading={isLoading}
          onClose={clearModal}
          onSave={task => (selected.id ? handleEditTask(task) : handleAddTask(task))}
          task={selected.id ? selected : null}
        />
      </Suspense>
    </section>
  );
}

export default ActivityDetail;
