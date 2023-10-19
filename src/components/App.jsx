import { useEffect } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPictures } from './Api/getPictures';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');

  useEffect(() => {
    if (!searchValue) return;
    setIsLoading(true);

    getPictures(searchValue, page)
      .then(data => {
        if (!data.totalHits) {
          Notiflix.Notify.failure(`Sorry, ${searchValue} not found 😢`);
          return;
        }

        setPhotos(prevPhotos => {
          return [...prevPhotos, ...data.hits];
        });
      })
      .catch(() =>
        Notiflix.Notify.failure(
          'Sorry! This site is temporarily unavailable due to a technical issue.'
        )
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchValue, page]);

  const onSubmit = e => {
    e.preventDefault();
    setSearchValue(e.target[1].value);
    setPhotos([]);
    setPage(1);
  };

  const loadMoreClick = () => {
    setPage(page + 1);
  };

  const openModal = selectedImage => {
    setModalPhoto(selectedImage);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalPhoto('');
    setShowModal(false);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}

      {searchValue && <ImageGallery photos={photos} openModal={openModal} />}
      {photos.length !== 0 && <Button loadMoreClick={loadMoreClick} />}
      {showModal && <Modal closeModal={closeModal} image={modalPhoto} />}
    </div>
  );
};
