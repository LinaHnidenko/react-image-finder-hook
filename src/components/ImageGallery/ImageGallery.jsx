import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos, openModal }) => {
  return (
    <>
      <ul className={css.gallery}>
        {photos.map(photo => (
          <ImageGalleryItem key={photo.id} image={photo} onClick={openModal} />
        ))}
      </ul>
    </>
  );
};
