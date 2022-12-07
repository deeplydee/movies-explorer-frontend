import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useWindowResize } from '../../hooks/useWindowResize';
import MoviesCard from '../MoviesCard/MoviesCard';

import {
  NOT_FOUND_ERR_MESSAGE,
  SERVER_ERR_MESSAGE,
  INIT_SINGLE_GRID,
  INIT_TWO_GRID,
  INIT_THREE_GRID,
  MORE_SINGLE_GRID,
  MORE_TWO_GRID,
  MORE_THREE_GRID,
  WIDTH_THREE_GRID,
  WIDTH_TWO_GRID,
  WIDTH_SINGLE_GRID,
} from '../../utils/constants';

import './MoviesCardList.css';

function MoviesCardList({
  isMoviesPage,
  movies,
  onSaveMovie,
  onDeleteMovie,
  isSaveMovies,
  isNotFoundMovies,
  isServerTextError,
}) {
  const { pathname } = useLocation();

  const windowWidth = useWindowResize();

  const [initCards, setInitCards] = useState({});
  const [moreLoadCards, setMoreLoadCards] = useState({});

  useEffect(() => {
    if (windowWidth >= WIDTH_THREE_GRID) {
      setInitCards(INIT_THREE_GRID);
      setMoreLoadCards(MORE_THREE_GRID);
    }
    if (windowWidth < WIDTH_THREE_GRID && windowWidth >= WIDTH_TWO_GRID) {
      setInitCards(INIT_TWO_GRID);
      setMoreLoadCards(MORE_TWO_GRID);
    }
    if (windowWidth < WIDTH_SINGLE_GRID) {
      setInitCards(INIT_SINGLE_GRID);
      setMoreLoadCards(MORE_SINGLE_GRID);
    }
  }, [windowWidth]);

  function handleLoadMoreButton() {
    setInitCards(initCards + moreLoadCards);
  }

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <span className="movies-card-list__error">
          {isNotFoundMovies ? NOT_FOUND_ERR_MESSAGE : ''}
        </span>
        <span className="movies-card-list__error">
          {isServerTextError ? SERVER_ERR_MESSAGE : ''}
        </span>
        <ul className="movies-card-list__list">
          {movies.slice(0, initCards).map((movie, i) => {
            return (
              <MoviesCard
                movie={movie}
                key={isMoviesPage ? movie.id : movie.movieId}
                onDeleteMovie={onDeleteMovie}
                onSaveMovie={onSaveMovie}
                isSaveMovies={isSaveMovies}
                isMoviesPage={isMoviesPage}
              />
            );
          })}
        </ul>
        {pathname === '/movies' && (
          <div className="movies-card-list__button-container">
            <button
              type="button"
              onClick={handleLoadMoreButton}
              className={
                movies.length <= 8 || initCards >= movies.length
                  ? 'movies-card-list__button movies-card-list__button_hide'
                  : 'movies-card-list__button'
              }
            >
              Ещё
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;
