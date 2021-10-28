import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import sortString from '../../utils/sortString';
import {
  fetchDetail,
  addTask,
  deleteTask,
  editTask,
  toggleTask,
  editActivity,
} from '../../redux/actions/activities';
import { setModal, clearModal } from '../../redux/actions/common';
import { SORT, POPUP } from '../../common/constants/activity';
import Header from './components/Header';
import './index.css';

const ModalTaskForm = React.lazy(() => import('../../common/modals/ModalTaskForm'));
const ModalDelete = React.lazy(() => import('../../common/modals/ModalDelete'));
const TaskCard = React.lazy(() => import('./components/TaskCard'));
const Empty = React.lazy(() => import('../../common/components/Empty'));

function ActivityDetail() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.activities);
  const { loading, modal, selected } = useSelector((state) => state.common);

  const [sort, setSort] = React.useState(SORT.NEWEST);

  const handleSort = React.useCallback(
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

  const todos = React.useMemo(
    () => (detail?.todo_items ? detail.todo_items.sort(handleSort) : []),
    [detail, handleSort]
  );

  React.useEffect(() => {
    dispatch(fetchDetail(params.id));
  }, []); // eslint-disable-line

  return (
    <section className="container">
      <Header
        title={detail?.title}
        sort={sort}
        setSort={setSort}
        onBack={() => history.push('/')}
        onAddTask={() => dispatch(setModal(POPUP.FORM))}
        onEditTitle={(title) => dispatch(editActivity(params.id, title))}
      />
      <div className="row task-row">
        {todos.length === 0 && !loading && (
          <React.Suspense fallback={null}>
            <Empty
              type="list item"
              onClick={() => dispatch(setModal(POPUP.FORM))}
              data-cy="todo-empty-state"
            />
          </React.Suspense>
        )}
        {todos.length > 0 &&
          todos.map((task) => (
            <React.Suspense key={task.id} fallback={null}>
              <TaskCard
                task={task}
                onDone={(val) => dispatch(toggleTask({ ...task, is_active: val }))}
                onEdit={() => dispatch(setModal(POPUP.FORM, task))}
                onDelete={() => dispatch(setModal(POPUP.DELETE, task))}
              />
            </React.Suspense>
          ))}
      </div>
      <React.Suspense fallback={null}>
        <ModalDelete
          isShow={modal === POPUP.DELETE}
          isLoading={loading}
          onClose={() => dispatch(clearModal())}
          onDelete={() => dispatch(deleteTask(selected.id))}
          type="list item"
          title={selected.title}
        />
        <ModalTaskForm
          isShow={modal === POPUP.FORM}
          isLoading={loading}
          onClose={() => dispatch(clearModal())}
          onSave={(task) =>
            selected.id
              ? dispatch(editTask(task))
              : dispatch(addTask({ activity_group_id: params.id, ...task }))
          }
          task={selected.id ? selected : null}
        />
      </React.Suspense>
    </section>
  );
}

export default ActivityDetail;
