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
import * as films from '../../utils/MoviesApi';
import { AppContext } from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInfoTooltopOpen, setIsInfoTooltopOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([main.getDataUser(), main.getMovies()])
      .then(([currentUserData, currentSavedMovies]) => {

      })
      .catch((err) => console.log(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRegister({ name, email, password }) {
    setIsSending(true);
    main.register({ name, email, password })
      .then((res) => {
        setIsRegistered(true);
        setIsInfoTooltopOpen(true);
        main.authorize({ email, password })
          .then((res) => {
            localStorage.setItem('jwt', res.token);
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
          console.log(res);
          setCurrentUser(res.user);
          setLoggedIn(true);
          history.push('/movies');
        })
        .catch((err) => console.log(err));
    };
  };

  React.useEffect(() => console.log(currentUser));

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setMovies([]);
    history.push('/');
  };

  function closePopup() {
    setIsInfoTooltopOpen(false);
    setIsRegistered(false);
  }

  function getMoviesList(name)  {
    if (loggedIn) {
      setIsLoading(true);
      films.getMoviesCardList()
        .then((moviesList) => {
          localStorage.setItem('movies', JSON.stringify(moviesList));
          setMovies(moviesList);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };
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
            />
            <ProtectedRoute
              path='/saved-movies'
              component={SavedMovies}
              loggedIn={loggedIn}
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
