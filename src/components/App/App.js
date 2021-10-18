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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [isInfoTooltopOpen, setIsInfoTooltopOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userMovies, setUserMovies] = useState([]);
  const [serverError, setServerError] = React.useState(null)
  const [errorMessage, setErrorMessage] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      main.getDataUser(jwt)
        .then((res) => {
          setCurrentUser(res.user);
          setLoggedIn(true);
          getSavedMoviesCards();
          history.push('/movies');
        })
        .catch((err) => console.log(err));
    };
  };

  function handleRegister({ name, email, password }) {
    main.register({ name, email, password })
      .then((res) => {
        setServerError(null);
        setIsInfoTooltopOpen(true);
        handleLogin({ email, password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setServerError(409);
        } else if (err === 'Ошибка: 400') {
          setServerError(400);
        }
        console.log(err);
      });
  };

  function handleLogin({ email, password }) {
    main.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setCurrentUser(res.user);
        getSavedMoviesCards();
        setServerError(null)
        history.push('/movies');
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setServerError(401);
        } else if (err === 'Ошибка: 400') {
          setServerError(400);
        }
        console.log(err);
      })
  };

  function updateProfile({ name, email }) {
    setIsLoading(true);
    main.patchDataUser({ name, email })
      .then((res) => {
        if (res) {
          setCurrentUser({
            ...currentUser,
            name: res.name,
            email: res.email,
          });
          setServerError(null);
          setErrorMessage(false);
          setIsInfoTooltopOpen(true);
        };
      })
      .catch((err) => {
        if (err === 'Ошибка: 400') {
          setServerError(400);
        }
        console.log(err);
        setErrorMessage(true);
        setIsInfoTooltopOpen(true);
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
        setUserMovies([]);
        setCurrentUser({});
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  function closePopup() {
    setIsInfoTooltopOpen(false);
  };

  function getSavedMoviesCards() {
    main.getUserMovies()
      .then((moviesCards) => {
        setUserMovies(moviesCards.movies);
      })
      .catch((err) => console.log(err));
  };

  function handleSavedMovie(movieData) {
    main.addNewMovie(movieData)
    .then(() => {
      getSavedMoviesCards();
    })
    .catch((err) => console.log(err));
  };

  function handleMovieDelete(id) {
    main.deleteSavedMovie(id)
      .then((res) => {
        getSavedMoviesCards();
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
            onMovieLike={handleSavedMovie}
            onMovieDeleteLike={handleMovieDelete}
            savedMovies={userMovies}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            loggedIn={loggedIn}
            onMovieDelete={handleMovieDelete}
            savedMovies={userMovies}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            loggedIn={loggedIn}
            logout={handleLogout}
            updateProfile={updateProfile}
            isLoading={isLoading}
            serverError={serverError}
            errorMessage={errorMessage}
          />
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltopOpen}
          onClose={closePopup}
          error={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
