/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import sortString from 'utils/sortString';
import { fetchDetail, addTask, editTask, deleteTask, editActivity } from 'utils/api';
import { SORT } from 'common/constants/activity';
import useActivityState from 'common/hooks/useActivityState';
import ModalTaskForm from 'common/modals/ModalTaskForm';
import ModalDelete from 'common/modals/ModalDelete';
import ModalToast from 'common/modals/ModalToast';
import Header from './components/Header';
import TaskCard from './components/TaskCard';

function ActivityDetail() {
  const params = useParams();
  const qc = useQueryClient();

  const { selected, showedPopup, toastMessage, clearPopup, handlePopup } = useActivityState();
  const [sort, setSort] = useState(SORT.NEWEST);
  const detailDepsKey = ['detail', params.id];

  const { data: detail, isLoading } = useQuery(detailDepsKey, fetchDetail, {
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });

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

  const data = useMemo(() => (detail ? detail.todo_items.sort(handleSort) : []), [
    detail,
    handleSort,
  ]);

  const handleEditTitle = useMutation(editActivity, {
    onMutate: async ({ id, title }) => {
      await qc.cancelQueries(detailDepsKey);
      const previous = qc.getQueryData(detailDepsKey);
      qc.setQueryData(detailDepsKey, prev => ({ ...prev, title }));
      return { previous };
    },
    onError: (err, deleted, context) => {
      qc.setQueryData(detailDepsKey, context.previous);
    },
    onSuccess: () => {},
  });

  const handleAddTask = useMutation(addTask, {
    onError: () => handlePopup({ type: 'TOAST', message: 'Gagal menambahkan task baru.' }),
    onSuccess: res => {
      qc.setQueryData(detailDepsKey, prev => ({
        ...prev,
        todo_items: [{ ...res, is_active: 1 }, ...prev.todo_items],
      }));
      handlePopup({ type: 'TOAST', message: 'Berhasil menambahkan task baru.' });
    },
  });

  const handleEditTask = useMutation(editTask, {
    onMutate: async ({ id, title, priority, is_active }) => {
      await qc.cancelQueries(detailDepsKey);
      const previous = qc.getQueryData(detailDepsKey);
      qc.setQueryData(detailDepsKey, prev => ({
        ...prev,
        todo_items: prev.todo_items.map(item =>
          item.id !== id ? item : { ...item, title, priority, is_active }
        ),
      }));
      return { previous };
    },
    onError: (err, deleted, context) => {
      qc.setQueryData(detailDepsKey, context.previous);
      if (selected.id) {
        handlePopup({ type: 'TOAST', message: 'Gagal edit task.' });
      }
    },
    onSuccess: () => {
      console.log(selected);
      if (selected.id) {
        handlePopup({ type: 'TOAST', message: 'Berhasil edit task.' });
      }
    },
  });

  const handleDeleteTask = useMutation(deleteTask, {
    onMutate: async () => {
      await qc.cancelQueries(detailDepsKey);
      const previous = qc.getQueryData(detailDepsKey);
      qc.setQueryData(detailDepsKey, prev => ({
        ...prev,
        todo_items: prev.todo_items.filter(item => item.id !== selected.id),
      }));
      return { previous };
    },
    onError: (err, deleted, context) => {
      qc.setQueryData(detailDepsKey, context.previous);
      handlePopup({ type: 'TOAST', message: 'Gagal delete task.' });
    },
    onSuccess: () => {
      handlePopup({ type: 'TOAST', message: 'Berhasil delete task.' });
    },
  });

  return (
    <section className="container">
      <Header
        isLoading={isLoading}
        title={detail?.title}
        sort={sort}
        setSort={setSort}
        onAddTask={() => handlePopup({ type: 'TASK' })}
        onEditTitle={title => handleEditTitle.mutate({ id: params.id, title })}
      />
      <div className="row activity-row">
        {data.map(task => (
          <div key={task.id} className="col-12">
            <TaskCard
              key={task.id}
              task={task}
              onDone={val => handleEditTask.mutate({ ...task, is_active: val })}
              onEdit={() => handlePopup({ type: 'TASK', item: task })}
              onDelete={() => handlePopup({ type: 'DELETE', item: task })}
            />
          </div>
        ))}
      </div>
      <ModalToast isShow={showedPopup === 'TOAST'} message={toastMessage} onClose={clearPopup} />
      <ModalDelete
        isShow={showedPopup === 'DELETE'}
        isLoading={handleDeleteTask.isLoading}
        onClose={clearPopup}
        onDelete={handleDeleteTask.mutate}
        type="task"
        title={selected.title}
      />
      <ModalTaskForm
        isShow={showedPopup === 'TASK'}
        isLoading={handleAddTask.isLoading || handleEditTask.isLoading}
        onClose={clearPopup}
        onSave={task =>
          selected.id
            ? handleEditTask.mutate(task)
            : handleAddTask.mutate({ activity_group_id: params.id, ...task })
        }
        task={selected.id ? selected : null}
      />
    </section>
  );
}

export default ActivityDetail;
