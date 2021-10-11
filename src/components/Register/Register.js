import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormAndValidation';

function Register({ handleRegister, isSending }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      handleRegister({ name, email, password }, () => {
        resetForm();
      });
  }

  return (
    <>
      <section className='sign'>
        <Link to='/' className='sign__start-page'>
          <img className='sign__logo-image' src={logo} alt='Логотип' />
        </Link>
        <h2 className='sign__title'>Добро пожаловать!</h2>
        <form
          className='sign__form'
          onSubmit={handleSubmit}
        >
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
              onChange={handleChange}
              value={name || ''}
              disabled={isSending}
            />
            <span className='sign__input-error'>{errors.name}</span>
          </label>
          <label className='sign__label'>
            E-mail
            <input
              className='sign__input'
              required
              name='email'
              type='email'
              placeholder='i3n@yandxex.ru'
              onChange={handleChange}
              value={email || ''}
              disabled={isSending}
            />
            <span className='sign__input-error'>{errors.email}</span>
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
              onChange={handleChange}
              value={password || ''}
              disabled={isSending}
            />
            <span className='sign__input-error'>{errors.password}</span>
          </label>
          <button
            className={
              isValid ? 'sign__button' : 'sign__button sign__button_disabled'
            }
            type='submit'
            disabled={!isValid || isSending}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className='sign__toggle'>
          <p className='sign__text'>Уже зарегестрированы?</p>
          <Link className='sign__link' to='/signin'>Войти</Link>
        </div>
      </section>
    </>
  );
};

export default Register;