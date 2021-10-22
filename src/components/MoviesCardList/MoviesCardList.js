import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { Route, useLocation } from 'react-router-dom';
import {
  MOVIES_FOR_LARGE_SCREEN,
  MOVIES_FOR_AVAREGE_SCREEN,
  MOVIES_FOR_SMALL_SCREEN,
  LARGE_SCREEN,
  AVAREGE_SCREEN,
  MOVIES_ADD_LARGE_SCREEN,
  MOVIES_ADD_AVAREGE_SCREEN,
} from '../../utils/constants';

function MoviesCardList({
  onMovieLike,
  onMovieDeleteLike,
  movies = [],
  checkLike,
}) {
  const { pathname } = useLocation();
  const [countMovies, setCountMovies] = React.useState(0);

  React.useEffect(() => {
    pathname === '/movies' ? handleAmountCards() : setCountMovies(movies.length);
  }, [movies, pathname]);

  function handleAmountCards() {
    if (window.innerWidth >= LARGE_SCREEN) {
      setCountMovies(MOVIES_FOR_LARGE_SCREEN);
    } else if (window.innerWidth >= AVAREGE_SCREEN) {
      setCountMovies(MOVIES_FOR_AVAREGE_SCREEN);
    } else {
      setCountMovies(MOVIES_FOR_SMALL_SCREEN);
    }
  }

  function addMoreMovies() {
    if (window.innerWidth >= LARGE_SCREEN) {
      setCountMovies(countMovies + MOVIES_ADD_LARGE_SCREEN);
    } else {
      setCountMovies(countMovies + MOVIES_ADD_AVAREGE_SCREEN)
    }
  };

  return (
    <div className='movies-card-list'>
        <div className='movies-card-list__container'>
          {movies.slice(0, countMovies).map(movie => {
            return (
              <MovieCard
                onMovieLike={onMovieLike}
                onMovieDeleteLike={onMovieDeleteLike}
                movie={movie}
                checkLike={checkLike}
                key={movie.movieId}
              />
            )
          })}
        </div>
      <Route path='/movies'>
        <button
          className={
            countMovies >= movies.length
              ? 'movies-card-list__button movies-card-list__button_disabled'
              : 'movies-card-list__button'
          }
          aria-label='ещё'
          onClick={addMoreMovies}
          disabled={countMovies >= movies.length}
        >
          Ещё
        </button>
      </Route>
    </div>
  );
}

export default MoviesCardList;