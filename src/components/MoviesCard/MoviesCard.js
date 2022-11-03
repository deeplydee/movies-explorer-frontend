import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import movie from '../../images/test-movie.jpg';

function MoviesCard() {
  const { pathname } = useLocation();

  return (
    <section className="movies-card">
      <div className="movies-card__wrapper">
        <img className="movies-card__image" src={movie} alt="Фильм" />
        {/* <button
          className="movies-card__change-save-button"
          type="button"
          aria-label="Сохранить фильм"
        >
          Сохранить
        </button> */}
        {pathname === '/saved-movies' ? (
          <button
            className="movies-card__change-delete-image"
            type="button"
            aria-label="Сохранённый фильм"
          ></button>
        ) : (
          <button
            className="movies-card__change-save-image"
            type="button"
            aria-label="Сохранённый фильм"
          ></button>
        )}
        <div className="movies-card__info">
          <h2 className="movies-card__title">33 слова о дизайне</h2>
          <p className="movies-card__duration">1ч 17м</p>
        </div>
      </div>
    </section>
  );
}

export default MoviesCard;
