import type { Cinema } from '@/entities/cinemas';
import type { MovieSession } from '@/entities/movie-sessions';
import type { GroupedCinemaSessions } from '../model/types';

/**
 * Группирует сеансы по кинотеатрам
 * @param sessions - массив сеансов
 * @param cinemas - массив кинотеатров
 * @returns массив сгруппированных сеансов по кинотеатрам
 */
export const groupSessionsByCinemas = (sessions: MovieSession[], cinemas: Cinema[]): GroupedCinemaSessions[] => {
  return cinemas
    .map((cinema) => ({
      cinema,
      sessions: sessions.filter((session) => session.cinemaId === cinema.id),
    }))
    .filter((group) => group.sessions.length > 0); // убираем кинотеатры без сеансов
};
