import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "../../../shared/api/baseFetch";
import { queryKeys } from "../../../shared/api/queryKeys";
import type { MovieSession } from "../model/types";

interface Cinema {
  id: number;
  name: string;
  address: string;
}

interface GroupedCinemaSessions {
  cinema: Cinema;
  sessions: MovieSession[];
}

const fetchMovieSessions = async (movieId: string): Promise<MovieSession[]> => {
  return baseFetch<MovieSession[]>(`/movies/${movieId}/sessions`);
};

const fetchCinemas = () => baseFetch<Cinema[]>(`/cinemas`);

export const useMovieSessionsQuery = (movieId: string) =>
  useQuery({
    queryKey: queryKeys.movieSessions(Number(movieId)),
    queryFn: async (): Promise<GroupedCinemaSessions[]> => {
      const [sessions, cinemas] = await Promise.all([
        fetchMovieSessions(movieId),
        fetchCinemas(),
      ]);

      // группируем сеансы по кинотеатрам
      const grouped = cinemas
        .map((cinema) => ({
          cinema,
          sessions: sessions.filter((s) => s.cinemaId === cinema.id),
        }))
        .filter((group) => group.sessions.length > 0); // убираем кинотеатры без сеансов

      return grouped;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!movieId,
  });
