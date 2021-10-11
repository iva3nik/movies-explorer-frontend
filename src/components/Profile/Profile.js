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
            {currentUser.name}
            <input
              className='profile__input'
              required
              name='name'
              type='text'
              placeholder='Ivan'
              minLength='2'
              maxLength='40'
              onChange={handleChange}
            />
          </label>
          <label className='profile__label'>
            {currentUser.email}
            <input
              className='profile__input'
              required
              name='email'
              type='email'
              placeholder='i3n@yandxex.ru'
              onChange={handleChange}
            />
          </label>
          <button
            className='profile__button profile__edit'
            type='submit'
          >
            Редактировать
          </button>
        </form>
        <button
          className='profile__button profile__logout'
          onClick={logout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </div>
  );
}

export default Profile;