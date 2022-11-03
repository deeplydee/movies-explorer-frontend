import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form" name="search-form">
        <div className="search-form__wrapper">
          <input
            className="search-form__data-input search-form__data-input_type_search-form-movie"
            type="text"
            name="movie"
            placeholder="Фильм"
            required
            id="search-form-name-input"
          />
          <button className="search-form__form-submit" type="submit">
            Найти
          </button>
        </div>
        <div className="search-form__wrapper-checkbox">
          <label className="search-form__checkbox" htmlFor="checkbox">
            <input
              className="search-form__data-input search-form__data-input_type_search-form-checkbox"
              type="checkbox"
              id="checkbox"
            />
            <span className="search-form__text">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
