import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <section className='sign'>
        <Link to='/' className='sign__start-page'>
          <img className='sign__logo-image' src={logo} alt='Логотип' />
        </Link>
        <h2 className='sign__title'>Рады видеть!</h2>
        <form className='sign__form'>
          <label className='sign__label'>
            E-mail
            <input
              className='sign__input'
              required
              name='email'
              type='email'
              placeholder=''
            />
          </label>
          <label className='sign__label'>
            Пароль
            <input
              className='sign__input'
              required
              name='password'
              type='text'
              placeholder=''
              minLength='2'
              maxLength='40'
            />
          </label>
        </form>
        <button className='sign__button'>Войти</button>
        <div className='sign__toggle'>
          <p className='sign__text'>Ещё не зарегестрированы?</p>
          <Link className='sign__link' to='/signup'>Регистрация</Link>
        </div>
      </section>
    </>
  );
};

export default Login;