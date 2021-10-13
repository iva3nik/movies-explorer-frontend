import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as movies from '../../utils/MoviesApi';
import { filterForMovies } from '../../utils/utils';

function Movies({ getMovies, isLoading }) {
  const [initialMovies, setInitialMovies] = React.useState([]);

  React.useEffect(() => {
    const lastSavedMovies = localStorage.getItem('movies');
      if (lastSavedMovies) {
        setInitialMovies(JSON.parse(lastSavedMovies));
      } else {
        setInitialMovies([]);
      }
  }, []);

  function getInitialMovies(name) {
    setInitialMovies([]);
    movies.getMoviesCardList()
      .then((movies) => {
        const moviesCards = movies.filter(movie => filterForMovies(movie, name));
        setInitialMovies(moviesCards);
        localStorage.setItem('movies', JSON.stringify(moviesCards));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
      <SearchForm
        isLoading={isLoading}
        getInitialMovies={getInitialMovies}
      />
      {isLoading && <Preloader />}
      {initialMovies &&
        <MoviesCardList
          initialMovies={initialMovies}
        />}
      <Footer />
    </div>
  );
}

export default Movies;