import { useState } from 'react';

function useActivityState() {
  const [selected, setSelected] = useState({});
  const [showedPopup, setShowedPopup] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const clearPopup = () => {
    setShowedPopup('');
    setSelected({});
  };
  const handlePopup = ({ type, item, message }) => {
    if (item) setSelected(item);
    if (message) setToastMessage(message);
    setShowedPopup(type);
  };

  return {
    selected,
    showedPopup,
    toastMessage,
    clearPopup,
    handlePopup,
  };
}

export default useActivityState;
