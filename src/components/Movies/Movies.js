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

  const [initialMovies, setinitialMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const lastSavedMovies = localStorage.getItem('movies');
      if (lastSavedMovies) {
        setinitialMovies(JSON.parse(lastSavedMovies));
      } else {
        setinitialMovies([]);
      }
  }, []);

  function getInitialMovies(name) {
    setinitialMovies([]);
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
    setinitialMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    lastSearchList.length === 0 &&
      setTimeout(() => console.log('Ничего не найдено'), 1000);
    return lastSearchList;
  }

  return (
    <div>
      <Header />
      <SearchForm
        getInitialMovies={getInitialMovies}
      />
      {isLoading && <Preloader />}
      {initialMovies  && (
        <MoviesCardList
          onMovieLike={onMovieLike}
          onMovieDeleteLike={onMovieDeleteLike}
          initialMovies={initialMovies}
          savedMovies={savedMovies}
        />
      )}
      <Footer />
    </div>
  );
}

export default Movies;