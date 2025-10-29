import type { Movie } from '@/entities/movies';
import type { MovieSession } from '@/entities/cinema-sessions';

export interface GroupedMovieSessions {
  movie: Movie;
  sessions: MovieSession[];
}
