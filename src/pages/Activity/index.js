import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import emptyItem from 'assets/images/empty-item.webp';
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

  const { data: activities } = useQuery('activities', fetchActivities);

  const handleAdd = useMutation(addActivity, {
    onError: () => {
      setToast('Gagal menambahkan activity baru.');
    },
    onSuccess: () => {
      qc.invalidateQueries('activities');
    },
  });

  const handleDelete = useMutation(deleteActivity, {
    onError: () => {
      clearModal();
      setToast('Gagal menghapus activity.');
    },
    onSuccess: () => {
      qc.invalidateQueries('activities');
      clearModal();
      setToast('Berhasil menghapus activity.');
    },
  });

  return (
    <section className="container">
      <Header onAddActivity={handleAdd.mutate} />
      <div className="row activity-row">
        {activities?.data.length === 0 && (
          <div className="empty-item" data-cy="activity-empty-state">
            <img src={emptyItem} alt="empty" onClick={handleAdd.mutate} />
          </div>
        )}
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
