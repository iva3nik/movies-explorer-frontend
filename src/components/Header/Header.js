import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, Route, NavLink } from 'react-router-dom'
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';

function Header({ loggedIn, emailUser }) {
  return (
   <>
      <Route exact path='/'>
        <header className='header'>
          <Link to='/'>
            <img className='header__logo-image' src={logo} alt='Логотип' />
          </Link>
          {loggedIn ? (
            <>
              <BurgerMenu />
              <Navigation />
              <nav className='header__links header__links_loggedIn'>
                <div className='header__main-links'>
                  <NavLink
                    to='/movies'
                    className='header__link header__link_bold'
                    activeClassName='header__link_active'
                  >
                    Фильмы
                  </NavLink>
                  <NavLink
                    to='/saved-movies'
                    className='header__link'
                    activeClassName='header__link_active'
                  >
                    Сохранённые фильмы
                  </NavLink>
                </div>
                <NavLink
                  to='/profile'
                  className='header__link header__link_account'
                  activeClassName='header__link_active'
                >
                  <Account emailUser={emailUser} />
                </NavLink>
              </nav>
            </>
          ) : (
            <nav className='header__links'>
            <NavLink
              to='/signup'
              className='header__link'
              activeClassName='header__link_active'
            >
              Регистрация
            </NavLink>
            <NavLink
              to='/signin'
              className='header__link'
              activeClassName='header__link_active'
            >
              <button className='header__button'>Войти</button>
            </NavLink>
          </nav>
          )}
        </header>
      </Route>
      <Route path={['/movies', '/saved-movies', '/profile']}>
        <header className='header header_loggedIn'>
          <Link to='/'>
            <img className='header__logo-image' src={logo} alt='Логотип' />
          </Link>
          <BurgerMenu />
          <Navigation />
          <nav className='header__links header__links_loggedIn'>
            <div className='header__main-links'>
              <NavLink
                to='/movies'
                className='header__link header__link_bold'
                activeClassName='header__link_active'
              >
                Фильмы
              </NavLink>
              <NavLink
                to='/saved-movies'
                className='header__link'
                activeClassName='header__link_active'
              >
                Сохранённые фильмы
              </NavLink>
            </div>
            <NavLink
              to='/profile'
              className='header__link header__link_account'
              activeClassName='header__link_active'
            >
              <Account emailUser={emailUser} />
            </NavLink>
          </nav>
        </header>
      </Route>
   </>
  );
}

export default Header;