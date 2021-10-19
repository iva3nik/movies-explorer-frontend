import React from 'react';
import './NotFoundMovies.css';

function NotFoundMovies({ message }) {
  return (
    <div className='not-found-movie'>
      <h3 className='not-found-movies__title'>{message}</h3>
    </div>
  );
};

export default NotFoundMovies;