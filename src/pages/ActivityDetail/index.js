import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import emptyItem from 'assets/images/empty-item.webp';
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

  const { selected, modal, showModal, clearModal, toast, setToast } = useActivityState();
  const [sort, setSort] = useState(SORT.NEWEST);
  const detailDepsKey = ['detail', params.id];

  const { data: detail, isLoading } = useQuery(detailDepsKey, fetchDetail);

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
    onSuccess: () => {
      qc.invalidateQueries(detailDepsKey);
    },
  });

  const handleAddTask = useMutation(addTask, {
    onError: () => {
      clearModal();
      setToast('Gagal menambahkan task baru.');
    },
    onSuccess: () => {
      qc.invalidateQueries(detailDepsKey);
      clearModal();
      setToast('Berhasil menambahkan task baru.');
    },
  });

  const handleEditTask = useMutation(editTask, {
    onError: () => {
      if (selected.id) {
        clearModal();
        setToast('Gagal edit task.');
      }
    },
    onSuccess: () => {
      qc.invalidateQueries(detailDepsKey);
      if (selected.id) {
        clearModal();
        setToast('Berhasil edit task.');
      }
    },
  });

  const handleDeleteTask = useMutation(deleteTask, {
    onError: () => {
      clearModal();
      setToast('Gagal delete task.');
    },
    onSuccess: () => {
      qc.invalidateQueries(detailDepsKey);
      clearModal();
      setToast('Berhasil delete task.');
    },
  });

  return (
    <section className="container">
      <Header
        isLoading={isLoading}
        title={detail?.title}
        sort={sort}
        setSort={setSort}
        onAddTask={() => showModal('TASK')}
        onEditTitle={title => handleEditTitle.mutate({ id: params.id, title })}
      />
      <div className="row activity-row">
        {data.length === 0 && (
          <div className="empty-item" data-cy="todo-empty-state">
            <img src={emptyItem} alt="empty" id="TextEmptyTodo" onClick={() => showModal('TASK')} />
          </div>
        )}
        {data.length > 0 &&
          data.map(task => (
            <div key={task.id} className="col-12">
              <TaskCard
                key={task.id}
                task={task}
                onDone={val => handleEditTask.mutate({ ...task, is_active: val })}
                onEdit={() => showModal('TASK', task)}
                onDelete={() => showModal('DELETE', task)}
              />
            </div>
          ))}
      </div>
      <ModalToast isShow={!!toast} message={toast} onClose={() => setToast('')} />
      <ModalDelete
        isShow={modal === 'DELETE'}
        isLoading={handleDeleteTask.isLoading}
        onClose={clearModal}
        onDelete={() => handleDeleteTask.mutate(selected.id)}
        type="task"
        title={selected.title}
      />
      <ModalTaskForm
        isShow={modal === 'TASK'}
        isLoading={handleAddTask.isLoading || handleEditTask.isLoading}
        onClose={clearModal}
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
