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
  const { selected, modal, showModal, clearModal, toast, setToast } = useActivityState();

  const { data: activities } = useQuery('activities', fetchActivities, {
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
  });

  const handleAdd = useMutation(addActivity, {
    onError: () => {
      setToast('Gagal menambahkan activity baru.');
    },
    onSuccess: res => {
      qc.setQueryData('activities', prev => ({ ...prev, data: [res, ...prev.data] }));
    },
  });

  const handleDelete = useMutation(deleteActivity, {
    onMutate: async id => {
      await qc.cancelQueries('activities');
      const previous = qc.getQueryData('activities');
      qc.setQueryData('activities', prev => ({
        ...prev,
        data: prev.data.filter(item => item.id !== id),
      }));
      return { previous };
    },
    onError: (err, deleted, context) => {
      qc.setQueryData('activities', context.previous);
      clearModal();
      setToast('Gagal menghapus activity.');
    },
    onSuccess: () => {
      clearModal();
      setToast('Berhasil menghapus activity.');
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
                onDelete={() => showModal('DELETE', activity)}
              />
            </div>
          ))}
      </div>
      <ModalToast isShow={!!toast} message={toast} onClose={() => setToast('')} />
      <ModalDelete
        isShow={modal === 'DELETE'}
        isLoading={handleDelete.isLoading}
        onClose={clearModal}
        onDelete={() => handleDelete.mutate(selected.id)}
        type="activity"
        title={selected.title}
      />
    </section>
  );
}

export default Activity;
