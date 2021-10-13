import React from 'react';
import './MovieCard.css';
import { Route } from 'react-router-dom';

function MovieCard({ movie, duration, nameRU, image }) {

  function transformTime(time) {
    const hours = Math.trunc(time/60);
    const minutes = time % 60;
    return (hours + 'ч ' + minutes + 'м');
  }

  return (
    <div className='movie-card'>
      <img
        className='movie-card__poster'
        src={image}
        alt={nameRU}
      />
      <div className='movie-card__strip'>
        <h3 className='movie-card__name'>{nameRU}</h3>
        <Route path='/movies'>
          <button
            className='movie-card__button-like'
            type='button'
          />
        </Route>
        <Route path='/saved-movies'>
          <button
            className='movie-card__button-delete'
            type='button'
          />
        </Route>
      </div>
      <div className='movie-card__duration'>{transformTime(duration)}</div>
    </div>
  );
}

export default MovieCard;