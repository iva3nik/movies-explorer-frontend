import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ handleCheckboxChange, shortMovieFilter }) {
  return (
    <div className='filter-checkbox'>
      <input
        type='checkbox'
        id='switch'
        className='filter-checkbox__tongle'
        checked={shortMovieFilter}
        onChange={handleCheckboxChange}
      />
      <label htmlFor='switch' className='filter-checkbox__label'></label>
      <p className='filter-checkbox__text'>
        {shortMovieFilter ? 'Короткометражки' : 'Полнометражные'}
      </p>
    </div>
  );
}

export default FilterCheckbox;