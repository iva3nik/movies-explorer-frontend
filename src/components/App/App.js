import React from 'react';
import { useState } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import * as main from '../../utils/MainApi';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);


  function handleRegister({ name, email, password }) {
    main.register({ name, email, password })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  function handleLogin({ email, password }) {
    main.authorize({ email, password })
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  function handleLogout() {
    setLoggedIn(false);
  };

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
          <Main />
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
          loggedOut={handleLogout}
        />
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
