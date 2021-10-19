import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';
import * as moviesApi from '../../utils/MoviesApi';

function Movies({
  onMovieLike,
  onMovieDeleteLike,
  savedMovies,
}) {

  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [shortMovieFilter, setShortMovieFilter] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
    lastSearchList && setMovies(lastSearchList);
    setShortMovieFilter(false);
  }, []);

  function handleCheckboxChange() {
    setShortMovieFilter(!shortMovieFilter);
    const lastFoundMovies = JSON.parse(localStorage.getItem('lastSearchList'));
    if (!shortMovieFilter) {
      const moviesFilter = lastFoundMovies.filter(movieCard => movieCard.duration <= 40);
      setMovies(moviesFilter);
    } else {
      setMovies(lastFoundMovies)
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
      .finally(() => {
        setIsLoading(false);
        setMessage('');
      });
  };

  function searchMovies(name) {
    if(!name) {
      setMessage('Нужно ввести ключевое слово');
      return;
    };
    const MoviesList = JSON.parse(localStorage.getItem('movies'));
    const lastSearchList = MoviesList.filter((movie) => {
      return (movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
      (movie.nameEN !== null &&
        movie.nameEN.toLowerCase().includes(name.toLowerCase())))
    });
    setMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    setShortMovieFilter(false);
    lastSearchList.length === 0 &&
      setTimeout(() => setMessage('Ничего не найдено'), 100);
    return lastSearchList;
  }

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
          savedMovies={savedMovies}
        />
      )}
      <Footer />
    </div>
  );
}

export default Movies;