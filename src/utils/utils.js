export const filterForMovies = (movie, name) => {
  if (movie.nameRU.toString().toLowerCase().includes(name) ||
      (movie.nameEN !== null &&
          movie.nameEN.toString().toLowerCase().includes(name))) {
        return movie;
  }
    return;
}