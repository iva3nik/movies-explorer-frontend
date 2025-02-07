import React from 'react';
import { useState } from 'react';
import './App.css';
import { Route, Switch, Redirect, useHistory } from 'react-router';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import InfoTooltip from '../InfoTooltip.js/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as main from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { DURATION_SHORT_MOVIE } from '../../utils/constants';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltopOpen, setIsInfoTooltopOpen] = useState(false);
  const [infoPopupTitle, setInfoPopupTitle] = useState({ title: '', });
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userMovies, setUserMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [shortMovieFilter, setShortMovieFilter] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([main.getDataUser(), main.getUserMovies()])
      .then(([dataUserInfo, dataUserMovies]) => {
        setCurrentUser(dataUserInfo.user);
        setUserMovies(dataUserMovies.movies);
        localStorage.setItem('savedMovies', JSON.stringify(dataUserMovies.movies));
        const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
        lastSearchList && setMovies(lastSearchList);
        setShortMovieFilter(false);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {checkToken(token);}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkToken(token) {
    return main.getDataUser(token)
      .then((res) => {
        setCurrentUser(res.user);
        getUserMovies();
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  function getMovies(name) {
    setMovies([]);
    setMessage('');
    setIsLoading(true);
    moviesApi.getMoviesCardList()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        searchMovies(name);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Во время запроса произошла ошибка.Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.')
      })
      .finally(() => {
        setIsLoading(false);
        console.log('');
      });
  };

  function getUserMovies() {
    main.getUserMovies()
      .then((dataUserMovies) => {
        setUserMovies(dataUserMovies.movies);
      })
      .catch((err) => console.log(err));
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
    if(lastSearchList.length === 0) {
      setTimeout(() => setMessage('Ничего не найдено'), 100);
    }
    setMessage('');
    return lastSearchList;
  }

  function handleCheckboxChange() {
    setShortMovieFilter(!shortMovieFilter);
    const lastFoundMovies = JSON.parse(localStorage.getItem('lastSearchList'));
    if (!shortMovieFilter) {
      const moviesFilter = lastFoundMovies
        .filter(movieCard => movieCard.duration <= DURATION_SHORT_MOVIE);
      setMovies(moviesFilter);
    } else {
      setMovies(lastFoundMovies)
    };
  };

  function handleRegister({ name, email, password }) {
    main.register({ name, email, password })
      .then((res) => {
        openPopup('Вы успешно зарегестрировались')
        handleLogin({ email, password });
      })
      .catch((err) => {
        openPopupError('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err);
      });
  };

  function handleLogin({ email, password }) {
    main.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        checkToken(res.token);
        history.push('/movies');
      })
      .catch((err) => {
        openPopupError('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err);
      })
  };

  function updateProfile({ name, email }) {
    setIsLoading(true);
    main.patchDataUser({ name, email })
      .then((res) => {
          setCurrentUser(res.user);
          openPopup('Данные обновлены!');
        })
      .catch((err) => {
        openPopupError('Что-то пошло не так! Попробуйте ещё раз.')
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleLogout({ email }) {
    main.logout({ email })
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('lastSearchList');
        localStorage.removeItem('savedMovies');
        setUserMovies([]);
        setMovies([]);
        setCurrentUser({});
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  function openPopupError(title) {
    setErrorMessage(true);
    setInfoPopupTitle({ title });
    setIsInfoTooltopOpen(true);
  }

  function openPopup(title) {
    setErrorMessage(false);
    setInfoPopupTitle({ title });
    setIsInfoTooltopOpen(true);
  }

  function closePopup() {
    setIsInfoTooltopOpen(false);
  };

  function checkLike(movie) {
    if (userMovies) {
      return userMovies.some((i) => movie.nameRU === i.nameRU);
    }
    return false;
  }

  function likeMovie(movie) {
    main.addNewMovie({
      country: movie.country || 'Неизвестно',
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailer: (movie.trailerLink.includes('https://')
        ? movie.trailerLink
        : `https://api.nomoreparties.co${movie.image.url}`)
          || `https://api.nomoreparties.co${movie.image.url}`,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: `${movie.id}`,
    })
    .then((res) => {
      const savedMovies = [...userMovies, res.movie];
      setUserMovies(savedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
    })
    .catch((err) => console.log(err));
  };

  function handleMovieDelete(movie) {
    main.deleteSavedMovie(movie._id)
      .then((res) => {
        getUserMovies();
      })
      .catch((err) => console.log(err));
  };

  function handleMovieDislike(movie) {
    const movieForDelete = userMovies.find((i) => i.movieId === String(movie.id));
    main.deleteSavedMovie(movieForDelete._id)
      .then((res) => {
        const savedMovies = userMovies.filter((i) => i._id !== movie._id);
        setUserMovies(savedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        getUserMovies();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path='/signin'>
            {loggedIn ? (
              <Redirect to='/' />
            ) : (
              <Login handleLogin={handleLogin} />
            )}
          </Route>
          <Route path='/signup'>
          {loggedIn ? (
              <Redirect to='/' />
            ) : (
              <Register handleRegister={handleRegister} />
            )}
          </Route>
          <Route exact path='/'>
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            loggedIn={loggedIn}
            onMovieLike={likeMovie}
            onMovieDeleteLike={handleMovieDislike}
            getMovies={getMovies}
            movies={movies}
            handleCheckboxChange={handleCheckboxChange}
            shortMovieFilter={shortMovieFilter}
            isLoading={isLoading}
            checkLike={checkLike}
            message={message}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            onMovieDelete={handleMovieDelete}
            movies={userMovies}
            isLoading={isLoading}
            checkLike={checkLike}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            logout={handleLogout}
            updateProfile={updateProfile}
            isLoading={isLoading}
          />
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltopOpen}
          onClose={closePopup}
          error={errorMessage}
          title={infoPopupTitle.title}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
