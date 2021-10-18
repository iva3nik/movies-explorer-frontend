import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi';

function Movies({
  onMovieLike,
  onMovieDeleteLike,
  savedMovies,
}) {

  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [shortMovieFilter, setShortMovieFilter] = React.useState(false);

  React.useEffect(() => {
    const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
    lastSearchList && setMovies(lastSearchList);
    setShortMovieFilter(false);
  }, []);

  function handleCheckboxChange() {
    setShortMovieFilter(!shortMovieFilter);
    const lastSavedMovies = JSON.parse(localStorage.getItem('movies'));
    if (!shortMovieFilter) {
      const moviesFilter = lastSavedMovies.filter(movieCard => movieCard.duration <= 40);
      setMovies(moviesFilter);
    } else {
      setMovies(lastSavedMovies)
    };
  };

  function getMovies(name) {
    setMovies([]);
    setIsLoading(true);
    moviesApi.getMoviesCardList()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        searchMovies(name);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function searchMovies(name) {
    if(!name) {
      console.log('Нужно ввести ключевое слово');
      return;
    };
    const MoviesList = JSON.parse(localStorage.getItem('movies'));
    const lastSearchList = MoviesList.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(name) ||
      (movie.nameEN !== null && movie.nameEN.toLowerCase().includes(name))) {
        return movie;
      }
      return;
    });
    setMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    setShortMovieFilter(false);
    lastSearchList.length === 0 &&
      setTimeout(() => console.log('Ничего не найдено'), 1000);
    return lastSearchList;
  }

  return (
    <div>
      <Header />
      <SearchForm
        getInitialMovies={getMovies}
        handleCheckboxChange={handleCheckboxChange}
        shortMovieFilter={shortMovieFilter}
      />
      {isLoading && <Preloader />}
      {movies  && (
        <MoviesCardList
          onMovieLike={onMovieLike}
          onMovieDeleteLike={onMovieDeleteLike}
          initialMovies={movies}
          savedMovies={savedMovies}
        />
      )}
      <Footer />
    </div>
  );
}

export default Movies;