import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';

function Profile({ logout, updateProfile }) {

  const currentUser = React.useContext(CurrentUserContext);

  const [data, setData] = useState({
    name: '',
    email: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = data;
    updateProfile({ name, email });
  }

  return (
    <div>
      <Header />
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label'>
            Имя
            <input
              className='profile__input'
              required
              name='name'
              type='text'
              placeholder={currentUser.name}
              minLength='2'
              maxLength='40'
              onChange={handleChange}
              value={currentUser.name || 'default'}
            />
          </label>
          <label className='profile__label'>
            E-mail
            <input
              className='profile__input'
              required
              name='email'
              type='email'
              placeholder={currentUser.email}
              onChange={handleChange}
              value={currentUser.email || 'default'}
            />
          </label>
          <button
            className='profile__button profile__edit'
            type='submit'
            onClick={handleSubmit}
          >
            Редактировать
          </button>
        </form>
        <button
          className='profile__button profile__logout'
          onClick={logout}
          type='button'
        >
          Выйти из аккаунта
        </button>
      </section>
    </div>
  );
}

export default Profile;