import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { Route } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

function MoviesCardList() {
  const value = React.useContext(AppContext);
  const movies = value.movies;
  const [countMovies, setCountMovies] = React.useState(0);

  React.useEffect(() => handleAmountCards(), [])

  function handleAmountCards() {
    if (window.innerWidth > 1279) {
      setCountMovies(12);
    } else if (window.innerWidth > 750) {
      setCountMovies(8);
    } else {
      setCountMovies(5);
    }
  }

  function addMoreMovies() {
    if (window.innerWidth > 1279) {
      setCountMovies(countMovies + 3);
    } else {
      setCountMovies(countMovies + 2)
    }
  };

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {movies.length > countMovies &&
          movies.slice(0, countMovies).map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
            />
          ))}
      </div>
      <Route path='/movies'>
        <button
          className='movies-card-list__button'
          aria-label='ещё'
          onClick={addMoreMovies}
        >
          Ещё
        </button>
      </Route>
    </div>
  );
}

export default MoviesCardList;