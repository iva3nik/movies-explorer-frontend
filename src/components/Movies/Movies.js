import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';

function Movies({
  onMovieLike,
  onMovieDeleteLike,
  getMovies,
  movies,
  handleCheckboxChange,
  shortMovieFilter,
  isLoading,
  checkLike,
  message,
}) {

  return (
    <div>
      <Header />
      <SearchForm
        getMovies={getMovies}
        handleCheckboxChange={handleCheckboxChange}
        shortMovieFilter={shortMovieFilter}
      />
      {isLoading && <Preloader />}
      {message && <NotFoundMovies message={message}/>}
      {movies  && (
        <MoviesCardList
          onMovieLike={onMovieLike}
          onMovieDeleteLike={onMovieDeleteLike}
          movies={movies}
          checkLike={checkLike}
        />
      )}
      <Footer />
    </div>
  );
}

export default Movies;