import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormAndValidation';
import Preloader from '../Preloader/Preloader';

function Profile({ logout, updateProfile, isSending, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const { name, email } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      updateProfile({ name, email }, () => {
        resetForm();
      });
  }

  return (
    <div>
      <Header />
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        {isLoading ? (
          <Preloader />
        ) : (
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
              value={name || ''}
              disabled={isSending}
            />
            <span className='profile__input-error'>{errors.name}</span>
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
              value={email || ''}
              disabled={isSending}
            />
            <span className='profile__input-error'>{errors.email}</span>
          </label>
          <button
            className={
              isValid ?
              'profile__button profile__edit' :
              'profile__button profile__edit profile__button_disabled'
            }
            type='submit'
            disabled={!isValid || isSending}
          >
            Редактировать
          </button>
        </form>
        )}
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