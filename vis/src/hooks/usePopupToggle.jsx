import { useState } from 'react';

const usePopupToggle = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  const togglePopup = () => setIsOpen(prev => !prev);

  return {
    isOpen,
    openPopup,
    closePopup,
    togglePopup,
  };
};

export default usePopupToggle;