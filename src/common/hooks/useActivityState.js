import { useState } from 'react';

function useActivityState() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
  };
}

export default useActivityState;
