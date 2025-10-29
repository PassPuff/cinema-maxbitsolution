export const queryKeys = {
  movies: ['movies'],
  movie: (id: number) => ['movie', id],
  movieSessions: (movieId: number) => ['movieSessions', movieId],
  orders: ['orders'],
  cinemas: ['cinemas'],
  cinema: (id: number) => ['cinema', id],
  cinemaSessions: (cinemaId: number) => ['cinemaSessions', cinemaId],
};
