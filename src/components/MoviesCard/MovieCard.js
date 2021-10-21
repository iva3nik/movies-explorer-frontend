import React from 'react';
import './MovieCard.css';
import { Route, useLocation } from 'react-router-dom';

function MovieCard({
  onMovieLike,
  onMovieDeleteLike,
  movie,
  checkLike,
}) {
  const { pathname } = useLocation();
  const isLiked = checkLike(movie);

  function handleLike() {
   onMovieLike(movie)
  };

  function handleDeleteLike() {
    onMovieDeleteLike(movie);
  }

  function transformTime(time) {
    const hours = Math.trunc(time/60);
    const minutes = time % 60;
    return (hours + 'ч ' + minutes + 'м');
  }

  return (
    <div className='movie-card'>
      <a
        href={movie.trailerLink}
        className='movei-card__trialer-link'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='movie-card__poster'
          src={
            pathname === '/movies'
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU || movie.nameEN}
        />
      </a>
      <div className='movie-card__strip'>
        <h3 className='movie-card__name'>{movie.nameRU || movie.nameEN}</h3>
        <Route path='/movies'>
          <button
            className={
              isLiked ?
              'movie-card__button-like movie-card__button-like_active' :
              'movie-card__button-like'
            }
            type='button'
            onClick={!isLiked ? handleLike : handleDeleteLike}
          />
        </Route>
        <Route path='/saved-movies'>
          <button
            className='movie-card__button-delete'
            type='button'
            onClick={handleDeleteLike}
          />
        </Route>
      </div>
      <div className='movie-card__duration'>{transformTime(movie.duration)}</div>
    </div>
  );
}

export default MovieCard;