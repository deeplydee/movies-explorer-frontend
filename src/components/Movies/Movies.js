import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css';

function Movies() {
  return (
    <section className="movies">
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </section>
  );
}

export default Movies;
