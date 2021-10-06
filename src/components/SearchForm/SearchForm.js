import React from 'react';
import './SearchForm.css';
import loupe from '../../images/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className='search-form'>
      <form className='search-form__strip'>
        <img className='search-form__img-loupe' src={loupe} alt='Картинка лупы' />
        <input
          className='search-form__string'
          type='text'
          placeholder='Фильм'
          required
        />
        <button className='search-form__button' type='submit'></button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;