export const queryKeys = {
  movies: ["movies"],
  movie: (id: number) => ["movie", id],
  orders: ["orders"],
  cinemas: ["cinemas"],
  cinema: (id: number) => ["cinemas", id],
};
