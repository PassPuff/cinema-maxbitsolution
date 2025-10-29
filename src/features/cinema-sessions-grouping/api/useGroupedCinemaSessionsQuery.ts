import { useQuery } from "@tanstack/react-query";
import { useCinemaSessionsQuery } from "@/entities/cinema-sessions";
import { useMoviesQuery } from "@/entities/movies";
import { queryKeys } from "@/shared/api/queryKeys";
import { groupSessionsByMovies } from "../lib/groupSessionsByMovies";
import type { GroupedMovieSessions } from "../model/types";

/**
 * Хук для получения сеансов кинотеатра, сгруппированных по фильмам
 */
export const useGroupedCinemaSessionsQuery = (cinemaId: string) => {
  const { data: sessions, isLoading: sessionsLoading, isError: sessionsError } = useCinemaSessionsQuery(cinemaId);
  const { data: movies, isLoading: moviesLoading, isError: moviesError } = useMoviesQuery();

  return useQuery({
    queryKey: [...queryKeys.cinemaSessions(Number(cinemaId)), "grouped"],
    queryFn: (): GroupedMovieSessions[] => {
      if (!sessions || !movies) return [];
      return groupSessionsByMovies(sessions, movies);
    },
    enabled: !!sessions && !!movies && !sessionsLoading && !moviesLoading,
    staleTime: 5 * 60 * 1000,
    meta: {
      isLoading: sessionsLoading || moviesLoading,
      isError: sessionsError || moviesError,
    },
  });
};
