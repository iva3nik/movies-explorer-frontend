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
import * as movieApi from '../../utils/MoviesApi';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInfoTooltopOpen, setIsInfoTooltopOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const history = useHistory();

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    Promise.all([main.getDataUser(), main.getUserMovies()])
      .then(([userData, savedMovies]) => {
        setCurrentUser(userData.user);
        const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
        lastSearchList && setMovies(lastSearchList);
        setUserMovies(savedMovies.movies);
        localStorage.setItem('savedMoviesList', JSON.stringify(savedMovies.movies));
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleRegister({ name, email, password }) {
    setIsSending(true);
    main.register({ name, email, password })
      .then((res) => {
        setIsRegistered(true);
        setIsInfoTooltopOpen(true);
        main.authorize({ email, password })
          .then((res) => {
            localStorage.setItem('jwt', res.token);
            getSavedMovies();
            setLoggedIn(true);
            history.push('/movies');
          })
          .catch((err) => console.log(err));
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltopOpen(true);
      })
      .finally(() => setIsSending(false));
  };

  function handleLogin({ email, password }) {
    setIsSending(true);
    main.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        getSavedMovies();
        history.push('/movies');
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSending(false));
  };

  function updateProfile({ name, email }) {
    setIsLoading(true);
    setIsSending(true);
    main.patchDataUser({ name, email })
      .then((res) => {
        if (res) {
          setCurrentUser({
            ...currentUser,
            name: res.name,
            email: res.email,
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsSending(false);
      })
  };

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      main.getDataUser(jwt)
        .then((res) => {
          setCurrentUser(res.user);
          setLoggedIn(true);
          getSavedMovies();
          history.push('/movies');
        })
        .catch((err) => console.log(err));
    };
  };

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserMovies([]);
    history.push('/');
  };

  function closePopup() {
    setIsInfoTooltopOpen(false);
    setIsRegistered(false);
  };

  function getMoviesList(name) {
    setIsLoading(true);
    movieApi.getMoviesCardList()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
        searchMovies(name);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  function searchMovies(name) {
    const MoviesList = JSON.parse(localStorage.getItem('movies'));
    const lastSearchList = MoviesList.filter((movie) => {
      const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
      return (
        movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        movie.description.toLowerCase().includes(name.toLowerCase()) ||
        nameEN.toLowerCase().includes(name.toLowerCase())
      );
    });
    setMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    return lastSearchList;
  }

  function getSavedMovies() {
    main.getUserMovies()
      .then((movies) => {
        setUserMovies(movies);
      })
      .catch((err) => console.log(err));
  };

  function deleteSavedMovie(id) {
    main.deleteSavedMovie(id)
      .then((res) => {
        getSavedMovies();
      })
      .catch((err) => console.log(err));
  };

  function addSavedMovie(movies) {
    main.addNewMovie(movies)
      .then(() => {
        getSavedMovies();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          loggedIn: loggedIn,
          isLoading: isLoading,
          movies: movies,
        }}
      >
        <div className="page">
          <Switch>
            <Route path='/signin'>
              {loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Login handleLogin={handleLogin} isSending={isSending} />
              )}
            </Route>
            <Route path='/signup'>
            {loggedIn ? (
                <Redirect to='/' />
              ) : (
                <Register handleRegister={handleRegister} isSending={isSending} />
              )}
            </Route>
            <Route exact path='/'>
              <Main loggedIn={loggedIn} />
            </Route>
            <ProtectedRoute
              path='/movies'
              component={Movies}
              getMovies={getMoviesList}
              isLoading={isLoading}
              loggedIn={loggedIn}
              savedMovies={userMovies}
              onMovieLike={addSavedMovie}
              onMovieDeleteLike={deleteSavedMovie}
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
              getMovies={userMovies}
              savedMovies={userMovies}
              onMovieLike={addSavedMovie}
              onMovieDeleteLike={deleteSavedMovie}
            />
            <ProtectedRoute
              path='/profile'
              component={Profile}
              loggedIn={loggedIn}
              logout={handleLogout}
              updateProfile={updateProfile}
              isSending={isSending}
              isLoading={isLoading}
            />
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
          <InfoTooltip
            isOpen={isInfoTooltopOpen}
            onClose={closePopup}
            isRegistered={isRegistered}
          />
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
