import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard({
  isMoviesPage,
  movie,
  onSaveMovie,
  onDeleteMovie,
  isSaveMovies,
}) {
  const { pathname } = useLocation();

  const handleSaveMovie = () => {
    onSaveMovie(movie);
  };

  const handleDeleteMovie = () => {
    onDeleteMovie(movie);
  };

  const getTimeFromMins = (mins) => {
    const minutes = mins % 60;
    const hours = Math.trunc(mins / 60);
    if (hours === 0) {
      return `${minutes}м`;
    } else if (minutes === 0) {
      return `${hours}ч`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  };

  return (
    <section className="movies-card">
      <div className="movies-card__wrapper">
        <a
          className="movies-card__trailer-link"
          href={movie.trailerLink}
          target="_blank"
          rel="noreferrer"
        >
          {pathname === '/movies' && (
            <img
              src={`https://api.nomoreparties.co/${movie.image.url}`}
              alt={movie.nameRU}
              className="movies-card__image"
            />
          )}
          {pathname === '/saved-movies' && (
            <img
              src={movie.thumbnail}
              alt={movie.nameRU}
              className="movies-card__image"
            />
          )}
        </a>

        {isMoviesPage ? (
          isSaveMovies(movie) ? (
            <button
              className="movies-card__change-save-image"
              type="button"
              aria-label="Сохранённый фильм"
              onClick={handleDeleteMovie}
            ></button>
          ) : (
            <button
              className="movies-card__change-save-button"
              type="button"
              aria-label="Сохранить фильм"
              onClick={handleSaveMovie}
            >
              Сохранить
            </button>
          )
        ) : (
          <button
            className="movies-card__change-delete-image"
            type="button"
            aria-label="Удалить фильм"
            onClick={handleDeleteMovie}
          ></button>
        )}
        <div className="movies-card__info">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <p className="movies-card__duration">
            {getTimeFromMins(movie.duration)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MoviesCard;
