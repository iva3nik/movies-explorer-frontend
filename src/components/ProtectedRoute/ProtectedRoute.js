import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const value = React.useContext(AppContext)
  return (
    <Route>
      {() =>
      value.loggedIn ? <Component {...props} /> : <Redirect to='/' />
    }
    </Route>
  );
};

export default ProtectedRoute;