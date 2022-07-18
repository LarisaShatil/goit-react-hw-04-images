import { useEffect } from 'react';

const Modal = ({children, onClose}) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
          <div className="Overlay" onClick={onBackdropClose}>
        <div className="Modal">{children}</div>
      </div>
  )

};

export default Modal;