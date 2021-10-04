import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='page-not-found'>
      <h2 className='page-not-found__title'>404</h2>
      <p className='page-not-found__text'>Страница не найдена</p>
      <Link className='page-not-found__link' to='/'>Назад</Link>
    </div>
  );
};

export default PageNotFound;