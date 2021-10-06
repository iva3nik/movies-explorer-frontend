import React from 'react';
import './MovieCard.css';
import picture from '../../images/somepicture.jpg'
import { Route } from 'react-router-dom';

function MovieCard() {
  return (
    <div className='movie-card'>
      <img className='movie-card__poster' src={picture} alt='Обложка фильма' />
      <div className='movie-card__strip'>
        <h3 className='movie-card__name'>33 words about design</h3>
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
      <div className='movie-card__duration'>12312</div>
    </div>
  );
}

export default MovieCard;