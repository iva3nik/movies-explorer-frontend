import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
  onMovieDelete,
  movies,
  getMovies,
  handleCheckboxChange,
  shortMovieFilter,
  isLoading,
  checkLike,
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
      {movies  && (
        <MoviesCardList
          onMovieDeleteLike={onMovieDelete}
          checkLike={checkLike}
          movies={movies}
        />
      )}
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default SavedMovies;