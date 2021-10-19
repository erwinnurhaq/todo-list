import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { addActivity, deleteActivity, fetchActivities } from 'utils/api';
import ModalDelete from 'common/modals/ModalDelete';
import ModalToast from 'common/modals/ModalToast';
import Header from './components/Header';
import ActivityCard from './components/ActivityCard';

function Activity() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const [selectedActivity, setSelectedActivity] = useState({});
  const [showedPopup, setShowedPopup] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const clearPopup = () => {
    setShowedPopup('');
    setSelectedActivity({});
  };
  const handlePopup = ({ type, activity, message }) => {
    if (activity) setSelectedActivity(activity);
    if (message) setToastMessage(message);
    setShowedPopup(type);
  };

  const { data: activities } = useQuery('activities', fetchActivities, {
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });

  const handleAdd = useMutation(addActivity, {
    onError: () => {
      handlePopup({ type: 'TOAST', message: 'Gagal menambahkan activity baru.' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries('activities');
      clearPopup();
    },
  });

  const handleDelete = useMutation(() => deleteActivity(selectedActivity.id), {
    onMutate: async () => {
      await queryClient.cancelQueries('activities');
      const previous = queryClient.getQueryData('activities');
      queryClient.setQueryData('activities', old => ({
        ...old,
        data: old.data.filter(item => item.id !== selectedActivity.id)
      }));
      return { previous };
    },
    onError: (err, deleted, context) => {
      queryClient.setQueryData('activities', context.previous);
      handlePopup({ type: 'TOAST', message: 'Gagal menghapus activity.' });
    },
    onSuccess: () => {
      handlePopup({ type: 'TOAST', message: 'Berhasil menghapus activity.' });
    },
  });

  return (
    <section className="container">
      <Header onAddActivity={handleAdd.mutate} />
      <div className="row activity-row">
        {activities?.data.length > 0 &&
          activities.data.map(activity => (
            <div key={activity.id} className="col-3">
              <ActivityCard
                activity={activity}
                onViewDetail={() => history.push(`/detail/${activity.id}`)}
                onDelete={() => handlePopup({ type: 'DELETE', activity })}
              />
            </div>
          ))}
      </div>
      <ModalToast isShow={showedPopup === 'TOAST'} message={toastMessage} onClose={clearPopup} />
      <ModalDelete
        isShow={showedPopup === 'DELETE'}
        isLoading={handleDelete.isLoading}
        onClose={clearPopup}
        onDelete={handleDelete.mutate}
        type="activity"
        title={selectedActivity.title}
      />
    </section>
  );
}

export default Activity;
