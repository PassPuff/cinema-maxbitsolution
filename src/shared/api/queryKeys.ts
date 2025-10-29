export const queryKeys = {
  movies: ['movies'],
  movie: (id: number) => ['movie', id],
  movieSessions: (movieId: number) => ['movieSessions', movieId],
  session: (sessionId: string) => ['session', sessionId],
  orders: ['orders'],
  bookings: ['bookings'],
  cinemas: ['cinemas'],
  cinema: (id: number) => ['cinema', id],
  cinemaSessions: (cinemaId: number) => ['cinemaSessions', cinemaId],
};
