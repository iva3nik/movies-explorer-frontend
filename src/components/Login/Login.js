import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormAndValidation';

function Login({ handleLogin }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      handleLogin({ email, password }, () => {
        resetForm();
      });
  }

  return (
    <>
      <section className='sign'>
        <Link to='/' className='sign__start-page'>
          <img className='sign__logo-image' src={logo} alt='Логотип' />
        </Link>
        <h2 className='sign__title'>Рады видеть!</h2>
        <form
          className='sign__form'
          onSubmit={handleSubmit}
        >
          <label className='sign__label'>
            E-mail
            <input
              className='sign__input'
              required
              name='email'
              type='email'
              pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
              placeholder=''
              onChange={handleChange}
              value={email || ''}
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
              placeholder=''
              minLength='2'
              maxLength='40'
              onChange={handleChange}
              value={password || ''}
            />
            <span className='sign__input-error'>{errors.password}</span>
          </label>
          <button
            className={
              isValid ? 'sign__button' : 'sign__button sign__button_disabled'
            }
            type='submit'
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <div className='sign__toggle'>
          <p className='sign__text'>Ещё не зарегестрированы?</p>
          <Link className='sign__link' to='/signup'>Регистрация</Link>
        </div>
      </section>
    </>
  );
};

export default Login;