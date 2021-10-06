import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Account from '../Account/Account';

function Navigation() {

  return (
    <div className='navigation'>
      <nav className='navigation__menu'>
        <ul className='navigation__links'>
          <NavLink
            to='/'
            className='navigation__link'
          >
            Главная
          </NavLink>
          <NavLink
            to='/movies'
            className='navigation__link'
            activeClassName='navigation__link_active'
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className='navigation__link'
            activeClassName='navigation__link_active'
          >
            Сохранённые фильмы
          </NavLink>
        </ul>
        <NavLink
          to='/profile'
          className='navigation__link navigation__link_account'
          activeClassName='navigation__link_active'
        >
          <Account />
        </NavLink>
      </nav>
    </div>
  );
}

export default Navigation;