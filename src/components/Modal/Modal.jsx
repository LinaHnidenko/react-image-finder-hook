import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.clickEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.clickEsc);
  }

  clickEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeModalClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    return (
      <div className={css.overlay} onClick={this.closeModalClick}>
        <div className={css.modal}>
          <img
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </div>
      </div>
    );
  }
}
