import React from 'react';
import './MovieCard.css';
import { Route } from 'react-router-dom';

function MovieCard({
  onMovieLike, onMovieDeleteLike, savedMovies, movie,
  country, director, duration, year, description,
  image, trailer, nameRU, nameEN, thumbnail, movieId,
}) {
  const movieData = {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  };
  const isLiked = savedMovies.some(
    i => i.nameRU === nameRU
  );

  function handleLike() {
    if (isLiked) {
      savedMovies.forEach((savedMovie) => {
        if (savedMovie.nameRU === nameRU) {
          onMovieDeleteLike(savedMovie._id);
        }
      });
    } else {
      onMovieLike(movieData);
    }
  };

  function handleDeleteLike() {
    onMovieDeleteLike(movie._id);
  }

  function transformTime(time) {
    const hours = Math.trunc(time/60);
    const minutes = time % 60;
    return (hours + 'ч ' + minutes + 'м');
  }

  return (
    <div className='movie-card'>
      <a
        href={trailer}
        className='movei-card__trialer-link'
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='movie-card__poster'
          src={image || movie.image}
          alt={nameRU}
        />
      </a>
      <div className='movie-card__strip'>
        <h3 className='movie-card__name'>{nameRU}</h3>
        <Route path='/movies'>
          <button
            className={
              isLiked ?
              'movie-card__button-like movie-card__button-like_active' :
              'movie-card__button-like'
            }
            type='button'
            onClick={handleLike}
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
      <div className='movie-card__duration'>{transformTime(duration)}</div>
    </div>
  );
}

export default MovieCard;