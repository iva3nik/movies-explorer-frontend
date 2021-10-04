import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile() {
  return (
    <div>
      <Header />
      <section className='profile'>
        <h2 className='profile__title'>Привет, Иван!</h2>
        <form className='profile__form'>
          <label className='profile__label'>
            Имя
            <input
              className='profile__input'
              required
              name='name'
              type='text'
              placeholder='Ivan'
              minLength='2'
              maxLength='40'
            />
          </label>
          <label className='profile__label'>
            E-mail
            <input
              className='profile__input'
              required
              name='email'
              type='email'
              placeholder='i3n@yandxex.ru'
            />
          </label>
        </form>
        <div className='profile__buttons'>
          <button className='profile__button profile__edit'>Редактировать</button>
          <button className='profile__button profile__logout'>Выйти из аккаунта</button>
        </div>
      </section>
    </div>
  );
}

export default Profile;