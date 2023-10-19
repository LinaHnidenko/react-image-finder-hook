import css from './Button.module.css';

export const Button = ({ loadMoreClick }) => {
  return (
    <button type="button" onClick={loadMoreClick} className={css.btnLoad}>
      Load more
    </button>
  );
};
