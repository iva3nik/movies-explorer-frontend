import React from 'react';
import './BurgerMenu.css';

function BurgerMenu() {
  return (
    <>
      <input className='burger-menu__toggle' type='checkbox' id='toggle' />
      <label className='burger-menu' htmlFor='toggle'>
        <span></span>
      </label>
    </>
  )
}

export default BurgerMenu;