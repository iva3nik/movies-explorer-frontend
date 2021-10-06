import { BEATFILM_MOVIES } from "./constants";

const hadnleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export const getMoviesCardList = () => {
  return fetch(`${BEATFILM_MOVIES}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
  })
  .then(hadnleResponse);
};

