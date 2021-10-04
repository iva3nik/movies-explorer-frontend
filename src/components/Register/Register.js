import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <>
      <section className='sign'>
        <Link to='/' className='sign__start-page'>
          <img className='sign__logo-image' src={logo} alt='Логотип' />
        </Link>
        <h2 className='sign__title'>Привет, Иван!</h2>
        <form className='sign__form'>
          <label className='sign__label'>
            Имя
            <input
              className='sign__input'
              required
              name='name'
              type='text'
              placeholder='Ivan'
              minLength='2'
              maxLength='40'
            />
          </label>
          <label className='sign__label'>
            E-mail
            <input
              className='sign__input'
              required
              name='email'
              type='email'
              placeholder='i3n@yandxex.ru'
            />
          </label>
          <label className='sign__label'>
            Пароль
            <input
              className='sign__input'
              required
              name='password'
              type='text'
              placeholder='Ivan'
              minLength='2'
              maxLength='40'
            />
          </label>
        </form>
        <button className='sign__button'>Зарегистрироваться</button>
        <div className='sign__toggle'>
          <p className='sign__text'>Уже зарегестрированы?</p>
          <Link className='sign__link' to='/signin'>Войти</Link>
        </div>
      </section>
    </>
  );
};

export default Register;