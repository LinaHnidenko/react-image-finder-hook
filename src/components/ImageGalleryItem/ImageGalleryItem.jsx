import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={css.galleryItem}>
      <img
        className={css.image}
        src={image.webformatURL}
        alt={image.alt}
        onClick={() => onClick(image)}
      />
    </li>
  );
};
