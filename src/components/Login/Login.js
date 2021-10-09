import React from 'react';
import { useState } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login({ handleLogin}) {

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!data.email || !data.password) {
      return
    }
    const { email, password } = data;
    handleLogin({ email, password });
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
              placeholder=''
              onChange={handleChange}
              value={data.email}
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
              onChange={handleChange}
              value={data.password}
            />
          </label>
          <button
            className='sign__button'
            type='subit'
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