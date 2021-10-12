import { MOVIES_SEARCH } from "./constants";

const checkStatusResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export const register = ({ name, email, password }) => {
  return fetch(`${MOVIES_SEARCH}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
  .then(checkStatusResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${MOVIES_SEARCH}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkStatusResponse);
};

export const logout = ({ email }) => {
  return fetch(`${MOVIES_SEARCH}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkStatusResponse);
};

export const getDataUser = (token) => {
  return fetch(`${MOVIES_SEARCH}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkStatusResponse)
};

export const patchDataUser = ({ name, email }) => {
  return fetch(`${MOVIES_SEARCH}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then(checkStatusResponse);
};

export const getMovies = () => {
  return fetch(`${MOVIES_SEARCH}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatusResponse);
};