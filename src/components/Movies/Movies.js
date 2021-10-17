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
  location,
}) {

  const [initialMovies, setInitialMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [shortMovieFilter, setShortMovieFilter] = React.useState(false);

  React.useEffect(() => {
    const lastSavedMovies = localStorage.getItem('movies');
      if (lastSavedMovies) {
        setInitialMovies(JSON.parse(lastSavedMovies));
      } else {
        setInitialMovies([]);
      }
      setShortMovieFilter(false);
  }, []);

  function handleCheckboxChange() {
    setShortMovieFilter(!shortMovieFilter);
    const lastSavedMovies = JSON.parse(localStorage.getItem('movies'));
    if (!shortMovieFilter) {
      const moviesFilter = lastSavedMovies.filter(movieCard => movieCard.duration <= 40);
      setInitialMovies(moviesFilter);
    } else {
      setInitialMovies(lastSavedMovies)
    };
  };

  function getInitialMovies(name) {
    setInitialMovies([]);
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
      const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
      return (
        movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        nameEN.toLowerCase().includes(name.toLowerCase())
      );
    });
    setInitialMovies(lastSearchList);
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
        getInitialMovies={getInitialMovies}
        handleCheckboxChange={handleCheckboxChange}
        shortMovieFilter={shortMovieFilter}
      />
      {isLoading && <Preloader />}
      {initialMovies  && (
        <MoviesCardList
          onMovieLike={onMovieLike}
          onMovieDeleteLike={onMovieDeleteLike}
          initialMovies={initialMovies}
          savedMovies={savedMovies}
          location={location}
        />
      )}
      <Footer />
    </div>
  );
}

export default Movies;