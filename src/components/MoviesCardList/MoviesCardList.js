import React from 'react';
import './MoviesCardList.css';
import MovieCard from '../MoviesCard/MovieCard';
import { Route } from 'react-router-dom';

function MoviesCardList() {
  return (
    <div className='movies-card-list'>
      <div className='movies-card-list__container'>
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
      <Route path='/movies'>
        <button className='movies-card-list__button' aria-label='ещё'>Ещё</button>
      </Route>
    </div>
  );
}

export default MoviesCardList;