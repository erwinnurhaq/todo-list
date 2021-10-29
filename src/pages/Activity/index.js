import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addActivity, fetchActivities } from '../../redux/actions/activities';
import { setModal } from '../../redux/actions/common';
import { POPUP } from '../../common/constants/activity';
import ActivityCard from './components/ActivityCard';
import Empty from '../../common/components/Empty';
import Header from './components/Header';
import './index.css';

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
          <Empty
            type="activity"
            onClick={() => dispatch(addActivity())}
            data-cy="activity-empty-state"
          />
        )}
        {activities?.length > 0 &&
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onViewDetail={() => history.push(`/detail/${activity.id}`)}
              onDelete={() => dispatch(setModal(POPUP.DELETE_ACT, activity))}
            />
          ))}
      </div>
    </section>
  );
}

export default Activity;
