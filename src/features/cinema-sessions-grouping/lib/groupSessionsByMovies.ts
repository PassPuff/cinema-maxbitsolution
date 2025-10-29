import type { Movie } from "@/entities/movies";
import type { MovieSession } from "@/entities/cinema-sessions";
import type { GroupedMovieSessions } from "../model/types";

/**
 * Группирует сеансы по фильмам
 * @param sessions - массив сеансов
 * @param movies - массив фильмов
 * @returns массив сгруппированных сеансов по фильмам
 */
export const groupSessionsByMovies = (
  sessions: MovieSession[],
  movies: Movie[]
): GroupedMovieSessions[] => {
  return movies
    .map((movie) => ({
      movie,
      sessions: sessions.filter((session) => session.movieId === movie.id),
    }))
    .filter((group) => group.sessions.length > 0); // убираем фильмы без сеансов
};
