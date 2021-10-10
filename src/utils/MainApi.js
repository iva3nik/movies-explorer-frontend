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

export const getContent = (token) => {
  return fetch(`${MOVIES_SEARCH}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkStatusResponse)
};