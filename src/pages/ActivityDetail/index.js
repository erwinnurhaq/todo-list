import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import sortString from '../../utils/sortString';
import {
  fetchDetail,
  addTask,
  editTask,
  toggleTask,
  editActivity,
} from '../../redux/actions/activities';
import { setModal, clearModal } from '../../redux/actions/common';
import { SORT, POPUP } from '../../common/constants/activity';
import ModalTaskForm from '../../common/modals/ModalTaskForm';
import Empty from '../../common/components/Empty';
import TaskCard from './components/TaskCard';
import Header from './components/Header';
import './index.css';

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
          <Empty
            type="list item"
            onClick={() => dispatch(setModal(POPUP.FORM))}
            data-cy="todo-empty-state"
          />
        )}
        {todos.length > 0 &&
          todos.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDone={(val) => dispatch(toggleTask({ ...task, is_active: val }))}
              onEdit={() => dispatch(setModal(POPUP.FORM, task))}
              onDelete={() => dispatch(setModal(POPUP.DELETE_TASK, task))}
            />
          ))}
      </div>
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
    </section>
  );
}

export default ActivityDetail;
