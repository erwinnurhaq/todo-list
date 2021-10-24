import { lazy, Suspense, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from 'layouts';
import { addActivity, deleteActivity, fetchActivities } from 'utils/api';
import ModalDelete from 'common/modals/ModalDelete';
import Header from './components/Header';

const ActivityCard = lazy(() => import('./components/ActivityCard'));
const Empty = lazy(() => import('common/components/Empty'));

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
    setToast,
  } = useContext(Context);

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
      setData([res, ...data]);
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
      setData(data.filter(i => i.id !== id));
      setToast('Berhasil menghapus activity.');
      getActivities();
    } catch {
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
            <Empty type="activity" onClick={handleAdd} data-cy="activity-empty-state" />
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
