import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

import './Movies.css';

function Movies({
  movies,
  onSubmit,
  onSaveMovie,
  onDeleteMovie,
  onCheckboxState,
  checkedState,
  requestKeyword,
  isLoading,
  isSaveMovies,
  isNotFoundMovies,
  isServerTextError,
}) {
  return (
    <section className="movies">
      <SearchForm
        onSubmit={onSubmit}
        onCheckboxState={onCheckboxState}
        checkedState={checkedState}
        defaultValue={requestKeyword}
      ></SearchForm>
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isMoviesPage={true}
          movies={movies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          isSaveMovies={isSaveMovies}
          isNotFoundMovies={isNotFoundMovies}
          isServerTextError={isServerTextError}
        ></MoviesCardList>
      )}
    </section>
  );
}

export default Movies;
