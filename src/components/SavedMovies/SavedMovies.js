import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies({
  movies,
  onSubmit,
  onSaveMovie,
  onDeleteMovie,
  onCheckboxState,
  checkedState,
  requestKeyword,
  isSaveMovies,
  isNotFoundMovies,
  isServerTextError,
}) {
  return (
    <section className="saved-movies">
      <SearchForm
        onSubmit={onSubmit}
        onCheckboxState={onCheckboxState}
        checkedState={checkedState}
        defaultValue={requestKeyword}
      ></SearchForm>
      <MoviesCardList
        isMoviesPage={false}
        movies={movies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        isSaveMovies={isSaveMovies}
        isNotFoundMovies={isNotFoundMovies}
        isServerTextError={isServerTextError}
      ></MoviesCardList>
    </section>
  );
}

export default SavedMovies;
