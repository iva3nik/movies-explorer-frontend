import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { AppContext } from '../../contexts/AppContext';

function Movies({
  isLoading,
  onMovieLike,
  onMovieDeleteLike,
  userMovies,
  getMovies,
}) {
  const value = React.useContext(AppContext);
  const movies = value.movies;

  return (
    <div>
      <Header />
      <SearchForm
        isLoading={isLoading}
        getMovies={getMovies}
      />
      {isLoading && <Preloader />}
      {movies && (
        <MoviesCardList
          onMovieLike={onMovieLike}
          onMovieDeleteLike={onMovieDeleteLike}
          userMovies={userMovies}
        />
      )}
      <Footer />
    </div>
  );
}

export default Movies;