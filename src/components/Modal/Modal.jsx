import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    window.addEventListener('keydown', clickEsc);
    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  });

  const clickEsc = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const closeModalClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={closeModalClick}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};
