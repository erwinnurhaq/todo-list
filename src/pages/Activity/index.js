import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addActivity, deleteActivity, fetchActivities } from '../../redux/actions/activities';
import { setModal, clearModal } from '../../redux/actions/common';
import { POPUP } from '../../common/constants/activity';
import Header from './components/Header';
import './index.css';

const ModalDelete = React.lazy(() => import('../../common/modals/ModalDelete'));
const ActivityCard = React.lazy(() => import('./components/ActivityCard'));
const Empty = React.lazy(() => import('../../common/components/Empty'));

function Activity() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state.activities);
  const { loading, modal, selected } = useSelector((state) => state.common);

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, []); // eslint-disable-line

  return (
    <section className="container">
      <Header onAddActivity={() => dispatch(addActivity())} isLoading={loading} />
      <div className="activity-row">
        {activities?.length === 0 && !loading && (
          <React.Suspense fallback={null}>
            <Empty
              type="activity"
              onClick={() => dispatch(addActivity())}
              data-cy="activity-empty-state"
            />
          </React.Suspense>
        )}
        {activities?.length > 0 &&
          activities.map((activity) => (
            <React.Suspense key={activity.id} fallback={null}>
              <ActivityCard
                activity={activity}
                onViewDetail={() => history.push(`/detail/${activity.id}`)}
                onDelete={() => dispatch(setModal(POPUP.DELETE, activity))}
              />
            </React.Suspense>
          ))}
      </div>
      <React.Suspense fallback={null}>
        <ModalDelete
          isShow={modal === POPUP.DELETE}
          isLoading={loading}
          onClose={() => dispatch(clearModal())}
          onDelete={() => dispatch(deleteActivity(selected.id))}
          type="activity"
          title={selected.title}
        />
      </React.Suspense>
    </section>
  );
}

export default Activity;
