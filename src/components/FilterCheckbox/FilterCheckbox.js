import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='filter-checkbox'>
      <input type='checkbox' id='switch' className='filter-checkbox__tongle' />
      <label htmlFor='switch' className='filter-checkbox__label'></label>
      <p className='filter-checkbox__text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;