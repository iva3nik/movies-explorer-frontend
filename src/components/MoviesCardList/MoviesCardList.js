import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { Route, useLocation } from 'react-router-dom';

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
    if (window.innerWidth >= 1220) {
      setCountMovies(12);
    } else if (window.innerWidth >= 657) {
      setCountMovies(8);
    } else {
      setCountMovies(5);
    }
  }

  function addMoreMovies() {
    if (window.innerWidth >= 1220) {
      setCountMovies(countMovies + 3);
    } else {
      setCountMovies(countMovies + 2)
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