import { useState, useEffect } from 'react';

import { INFO_TEXT } from '../../utils/constants';

import './SearchForm.css';

function SearchForm({ onSubmit, onCheckboxState, checkedState, defaultValue }) {
  const [errorText, setErrorText] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (keyword) {
      onSubmit(keyword);
    } else {
      return setErrorText(INFO_TEXT);
    }
    clear();
  };

  function clear() {
    setTimeout(() => {
      setErrorText('');
    }, 200);
  }

  return (
    <section className="search-form">
      <form
        className="search-form__form"
        name="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-form__wrapper">
          <input
            className="search-form__data-input search-form__data-input_type_search-form-movie"
            type="text"
            name="movie"
            placeholder="Фильм"
            required
            id="search-form-name-input"
            onChange={handleChange}
            value={keyword || ''}
          />
          <button className="search-form__form-submit" type="submit">
            Найти
          </button>
        </div>
        <span className="search-form__error">{errorText}</span>
        <div className="search-form__wrapper-checkbox">
          <label className="search-form__checkbox" htmlFor="checkbox">
            <input
              className="search-form__data-input search-form__data-input_type_search-form-checkbox"
              type="checkbox"
              id="checkbox"
              checked={checkedState}
              onChange={onCheckboxState}
            />
            <span className="search-form__text">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
