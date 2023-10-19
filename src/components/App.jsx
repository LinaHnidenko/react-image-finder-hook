import { Component } from 'react';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getPictures } from './Api/getPictures';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    photos: [],
    page: 1,
    isLoading: false,
    showModal: false,
    modalPhoto: '',
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({ isLoading: true });
      await getPictures(searchValue, page)
        .then(data => {
          if (!data.totalHits) {
            Notiflix.Notify.failure(`Sorry, ${searchValue} not found 😢`);
            return;
          }
          this.setState(prevState => ({
            photos: [...prevState.photos, ...data.hits],
          }));
        })
        .catch(() =>
          Notiflix.Notify.failure(
            'Sorry! This site is temporarily unavailable due to a technical issue.'
          )
        )
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ searchValue: e.target[1].value, photos: [], page: 1 });
  };

  loadMoreClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = selectedImage => {
    this.setState({ modalPhoto: selectedImage, showModal: true });
  };

  closeModal = () => {
    this.setState({ modalPhoto: '', showModal: false });
  };
  render() {
    return (
      <div className="app">
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading && <Loader />}

        <ImageGallery photos={this.state.photos} openModal={this.openModal} />
        {this.state.photos.length > 11 && (
          <Button loadMoreClick={this.loadMoreClick} />
        )}
        {this.state.showModal && (
          <Modal closeModal={this.closeModal} image={this.state.modalPhoto} />
        )}
      </div>
    );
  }
}
