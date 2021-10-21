import React from 'react';
import './SearchForm.css';
import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  getMovies,
  handleCheckboxChange,
  shortMovieFilter,
}) {

  const [name, setName] = React.useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getMovies(name);
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
          name='name'
          onChange={handleChange}
          value={name || ''}
        />
        <button
          className={'search-form__button'}
          type='submit'
        >
        </button>
      </form>
      <FilterCheckbox
        handleCheckboxChange={handleCheckboxChange}
        shortMovieFilter={shortMovieFilter}
      />
    </div>
  );
}

export default SearchForm;