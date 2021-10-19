import { useState } from 'react';

function useActivityState() {
  const [selected, setSelected] = useState({});
  const [modal, setModal] = useState('');
  const [toast, setToast] = useState('');

  const clearModal = () => {
    setModal('');
    setSelected({});
  };
  const showModal = (type, item) => {
    if (item) setSelected(item);
    setModal(type);
  };

  return {
    selected,
    modal,
    showModal,
    clearModal,
    toast,
    setToast,
  };
}

export default useActivityState;
