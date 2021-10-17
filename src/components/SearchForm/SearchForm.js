import React from 'react';
import './SearchForm.css';
import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hooks/useFormAndValidation';

function SearchForm({
  getInitialMovies,
  handleCheckboxChange,
  shortMovieFilter,
}) {
  const {values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { name } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid && getInitialMovies(name);
    resetForm();
  }

  return (
    <div className='search-form'>
      <form
        className='search-form__strip'
        onSubmit={handleSubmit}
      >
        <img className='search-form__img-loupe' src={loupe} alt='Картинка лупы' />
        <input
          className='search-form__string'
          type='text'
          placeholder='Фильм'
          required
          name='name'
          onChange={handleChange}
          value={name || ''}
        />
        <button
          className={
            isValid ?
              'search-form__button' :
              'search-form__button search-form__button_disabled'
          }
          type='submit'
          disabled={!isValid}
        >
        </button>
      </form>
      <span className='search__input-error'>{errors.name}</span>
      <FilterCheckbox
        handleCheckboxChange={handleCheckboxChange}
        shortMovieFilter={shortMovieFilter}
      />
    </div>
  );
}

export default SearchForm;