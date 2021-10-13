import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { Route } from 'react-router-dom';

function MoviesCardList({ initialMovies = [] }) {
  const [countMovies, setCountMovies] = React.useState(0);

  React.useEffect(() => handleAmountCards(), [initialMovies])

  function handleAmountCards() {
    if (window.innerWidth > 1220) {
      setCountMovies(12);
    } else if (window.innerWidth > 750) {
      setCountMovies(8);
    } else {
      setCountMovies(5);
    }
  }

  function addMoreMovies() {
    if (window.innerWidth > 1220) {
      setCountMovies(countMovies + 3);
    } else {
      setCountMovies(countMovies + 2)
    }
  };

  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        {initialMovies.slice(0, countMovies).map(movie => {
          return (
            <MovieCard
              movie={movie}
              key={movie.id}
              duration={movie.duration}
              nameRU={movie.nameRU}
              image={`https://api.nomoreparties.co${movie.image.url}`}
            />
          )
        })}
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