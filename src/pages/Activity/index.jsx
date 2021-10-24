import React from 'react';
import { useHistory } from 'react-router-dom';

import { Context } from '../../layouts';
import { addActivity, deleteActivity, fetchActivities } from '../../utils/api';
import ModalDelete from '../../common/modals/ModalDelete';
import Header from './components/Header';

const Empty = React.lazy(() => import('../../common/components/Empty'));
const ActivityCard = React.lazy(() => import('./components/ActivityCard'));

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
    resetState,
  } = React.useContext(Context);

  React.useEffect(() => {
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
          <React.Suspense fallback={null}>
            <Empty type="activity" onClick={handleAdd} data-cy="activity-empty-state" />
          </React.Suspense>
        )}
        {data?.length > 0 &&
          data.map(activity => (
            <React.Suspense key={activity.id} fallback={null}>
              <ActivityCard
                activity={activity}
                onViewDetail={() => {
                  resetState();
                  history.push(`/detail/${activity.id}`);
                }}
                onDelete={() => showModal('DELETE', activity)}
              />
            </React.Suspense>
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
