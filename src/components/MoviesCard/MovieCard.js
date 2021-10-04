import React from 'react';
import './MovieCard.css';
import picture from '../../images/somepicture.jpg'

function MovieCard() {
  return (
    <div className='movie-card'>
      <img className='movie-card__poster' src={picture} alt='' />
      <div className='movie-card__strip'>
        <h3 className='movie-card__name'>33 words about design</h3>
        <button className='movie-card__button-like' />
      </div>
      <div className='movie-card__duration'>12312</div>
    </div>
  );
}

export default MovieCard;