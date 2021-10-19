import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  onMovieDelete,
  savedMovies,
}) {

  const [movies, setMovies] = React.useState([]);
  const [shortMovieFilter, setShortMovieFilter] = React.useState(false);

  function handleCheckboxChange() {
    setShortMovieFilter(!shortMovieFilter);
  };

  function searchSavedMovies(name) {
    if(!name) {
      console.log('Нужно ввести ключевое слово');
      return;
    };
    if (savedMovies) {
      const savedMoviesList = savedMovies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        (movie.nameEN !== null &&
          movie.nameEN.toLowerCase().includes(name.toLowerCase())))
      });
      return setMovies(savedMoviesList);
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
      {savedMovies  && (
        <MoviesCardList
          onMovieDeleteLike={onMovieDelete}
          movies={movies.length > 0
              ? movies
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