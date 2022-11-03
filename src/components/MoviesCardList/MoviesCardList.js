import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

import { initialCards } from '../../utils/initial-cards';

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <div className="movies-card-list__wrapper">
        <ul className="movies-card-list__list">
          {initialCards.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </ul>
        <div className="movies-card-list__button-conteiner">
          <button className="movies-card-list__button" type="button">
            Ещё
          </button>
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
