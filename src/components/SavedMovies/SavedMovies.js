import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import NotFoundMovies from '../NotFoundMovies/NotFoundMovies';
import * as main from '../../utils/MainApi';
import { DURATION_SHORT_MOVIE } from '../../utils/constants';

function SavedMovies({
  onMovieDelete,
  movies,
  isLoading,
  checkLike,
}) {
  React.useEffect(() => {
    main.getUserMovies()
      .then((dataUserMovies) => {setUserMovies(dataUserMovies.movies)})
      .catch((err) => console.log(err));
  }, [movies])

  const [userMovies, setUserMovies] = React.useState(movies);
  const [shortMovieFilter, setShortMovieFilter] = React.useState(false);
  const [message, setMessage] = React.useState('');

  function handleCheckboxChange() {
    setShortMovieFilter(!shortMovieFilter);
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (!shortMovieFilter) {
      const moviesFilter = savedMovies
        .filter(movieCard => movieCard.duration <= DURATION_SHORT_MOVIE);
      setUserMovies(moviesFilter);
    } else {
      setUserMovies(savedMovies)
    };
  };

  function searchSavedMovies(name) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    setShortMovieFilter(false);
    setMessage('');
    if(!name) {
      setMessage('Нужно ввести ключевое слово');
      return;
    };
    if (savedMovies) {
      const searchMoviesList = savedMovies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        (movie.nameEN !== null &&
          movie.nameEN.toLowerCase().includes(name.toLowerCase())))
      });
      if (searchMoviesList.length === 0) {setMessage('Ничего не найдено')};
      return setUserMovies(searchMoviesList);
    }
  }

  return (
    <div>
      <Header />
      <SearchForm
        getMovies={searchSavedMovies}
        handleCheckboxChange={handleCheckboxChange}
        shortMovieFilter={shortMovieFilter}
      />
      {isLoading && <Preloader />}
      {message && <NotFoundMovies message={message} />}
      {userMovies  && !message && (
        <MoviesCardList
          onMovieDeleteLike={onMovieDelete}
          checkLike={checkLike}
          movies={userMovies}
        />
      )}
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default SavedMovies;