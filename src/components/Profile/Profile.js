import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormAndValidation';
import Preloader from '../Preloader/Preloader';

function Profile({ logout, updateProfile, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const { name, email } = values;

  function handleLogout() {
    logout({
      email: currentUser.email,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    isValid && updateProfile({ name, email }, () => {
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
              minLength='2'
              maxLength='40'
              onChange={handleChange}
              value={name || ''}
              placeholder={currentUser.name}
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
              pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
              onChange={handleChange}
              value={email || ''}
              placeholder={currentUser.email}
            />
            <span className='profile__input-error'>{errors.email}</span>
          </label>
          <button
            className={
              isValid &&
              ((currentUser.name !== name) || (currentUser.email !== email))
                ? 'profile__button profile__edit'
                : 'profile__button profile__edit profile__button_disabled'
            }
            type='submit'
            disabled={
              !isValid ||
                ((currentUser.name === name) && (currentUser.email === email))
            }
          >
            Редактировать
          </button>
        </form>
        )}
        <button
          className='profile__button profile__logout'
          onClick={handleLogout}
          type='button'
        >
          Выйти из аккаунта
        </button>
      </section>
    </div>
  );
}

export default Profile;