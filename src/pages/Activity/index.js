import { lazy, Suspense, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { addActivity, deleteActivity, fetchActivities } from 'utils/api';
import useActivityState from 'common/hooks/useActivityState';
import ModalDelete from 'common/modals/ModalDelete';
import ModalToast from 'common/modals/ModalToast';
import Header from './components/Header';

const ActivityCard = lazy(() => import('./components/ActivityCard'));
const Empty = lazy(() => import('./components/Empty'));

function Activity() {
  const history = useHistory();
  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    selected,
    modal,
    showModal,
    clearModal,
    toast,
    setToast,
  } = useActivityState();

  useEffect(() => {
    getActivities();
  }, []); // eslint-disable-line

  async function getActivities() {
    try {
      setIsLoading(true);
      const res = await fetchActivities();
      setData(res.data);
      setIsLoading(false);
    } catch {
      setToast('Gagal mendapatkan activity.');
      setIsLoading(false);
    }
  }

  async function handleAdd() {
    try {
      setIsLoading(true);
      const res = await addActivity('New Activity');
      setData(prev => [res, ...prev]);
      getActivities();
    } catch {
      setToast('Gagal menambahkan activity baru.');
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      setIsLoading(true);
      await deleteActivity(id);
      setData(prev => prev.filter(i => i.id !== id));
      clearModal();
      setToast('Berhasil menghapus activity.');
      getActivities();
    } catch {
      clearModal();
      setToast('Gagal menghapus activity.');
      setIsLoading(false);
    }
  }

  return (
    <section className="container">
      <Header onAddActivity={handleAdd} isLoading={isLoading} />
      <div className="row activity-row">
        {data?.length === 0 && !isLoading && (
          <Suspense fallback={null}>
            <Empty onClick={handleAdd} />
          </Suspense>
        )}
        {data?.length > 0 &&
          data.map(activity => (
            <Suspense key={activity.id} fallback={null}>
              <ActivityCard
                activity={activity}
                onViewDetail={() => history.push(`/detail/${activity.id}`)}
                onDelete={() => showModal('DELETE', activity)}
              />
            </Suspense>
          ))}
      </div>
      <ModalToast isShow={!!toast} message={toast} onClose={() => setToast('')} />
      <ModalDelete
        isShow={modal === 'DELETE'}
        isLoading={isLoading}
        onClose={clearModal}
        onDelete={() => handleDelete(selected.id)}
        type="activity"
        title={selected.title}
      />
    </section>
  );
}

export default Activity;
