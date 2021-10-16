import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi';

function SavedMovies({
  loggedIn,
  onMovieDelete,
  savedMovies,
}) {

  const [initialSavedMovies, setInitialSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  function getInitialSavedMovies(name) {
    setInitialSavedMovies([]);
    setIsLoading(true);
    moviesApi.getMoviesCardList()
      .then((movies) => {
      const savedMoviesCards = movies.filter((movie) => {
        const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
        return (
          movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          nameEN.toLowerCase().includes(name.toLowerCase())
        );
      });
      setInitialSavedMovies(savedMoviesCards);
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  return (
    <div>
      <Header />
      <SearchForm
        getInitialSavedMovies={getInitialSavedMovies}
      />
      {isLoading && <Preloader />}
      {savedMovies  && (
        <MoviesCardList
          onMovieDeleteLike={onMovieDelete}
          initialMovies={initialSavedMovies.length > 0
              ? initialSavedMovies
              : savedMovies
          }
          savedMovies={savedMovies}
        />
      )}
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default SavedMovies;