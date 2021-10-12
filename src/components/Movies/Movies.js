import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ getMovies, isLoading }) {
  return (
    <div>
      <Header />
      <SearchForm
        isLoading={isLoading}
        getMovies={getMovies}
      />
      {isLoading && <Preloader />}
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default Movies;