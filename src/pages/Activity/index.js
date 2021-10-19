import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { addActivity, deleteActivity, fetchActivities } from 'utils/api';
import useActivityState from 'common/hooks/useActivityState';
import ModalDelete from 'common/modals/ModalDelete';
import ModalToast from 'common/modals/ModalToast';
import Header from './components/Header';
import ActivityCard from './components/ActivityCard';

function Activity() {
  const history = useHistory();
  const qc = useQueryClient();
  const { selected, showedPopup, toastMessage, clearPopup, handlePopup } = useActivityState();

  const { data: activities } = useQuery('activities', fetchActivities, {
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });

  const handleAdd = useMutation(addActivity, {
    onError: () => {
      handlePopup({ type: 'TOAST', message: 'Gagal menambahkan activity baru.' });
    },
    onSuccess: res => {
      qc.setQueryData('activities', prev => ({ ...prev, data: [res, ...prev.data] }));
      clearPopup();
    },
  });

  console.log(selected)
  const handleDelete = useMutation(() => deleteActivity(selected.id), {
    onMutate: async () => {
      await qc.cancelQueries('activities');
      const previous = qc.getQueryData('activities');
      qc.setQueryData('activities', prev => ({
        ...prev,
        data: prev.data.filter(item => item.id !== selected.id),
      }));
      return { previous };
    },
    onError: (err, deleted, context) => {
      qc.setQueryData('activities', context.previous);
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
                onDelete={() => handlePopup({ type: 'DELETE', item: activity })}
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
        title={selected.title}
      />
    </section>
  );
}

export default Activity;
