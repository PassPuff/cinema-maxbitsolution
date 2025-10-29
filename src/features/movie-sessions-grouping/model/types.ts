import type { Cinema } from '@/entities/cinemas';
import type { MovieSession } from '@/entities/movie-sessions';

export interface GroupedCinemaSessions {
  cinema: Cinema;
  sessions: MovieSession[];
}
