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
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import * as main from '../../utils/MainApi';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isInfoTooltopOpen, setIsInfoTooltopOpen] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const history = useHistory();


  function handleRegister({ name, email, password }) {
    main.register({ name, email, password })
      .then((data) => {
        setIsRegistered(true);
        setIsInfoTooltopOpen(true);
        history.push('/signin')
      })
      .catch((err) => console.log(err));
      setIsInfoTooltopOpen(true);
  };

  function handleLogin({ email, password }) {
    main.authorize({ email, password })
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setEmailUser(email);
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => console.log(err));
  };

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  function closePopup() {
    setIsInfoTooltopOpen(false);
    setIsRegistered(false);
  }

  return (
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
          <Main emailUser={emailUser} />
        </Route>
        <ProtectedRoute
          path='/movies'
          component={Movies}
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
          emailUser={emailUser}
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
  );
}

export default App;
