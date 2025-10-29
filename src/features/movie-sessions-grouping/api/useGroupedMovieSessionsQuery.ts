import { useQuery } from "@tanstack/react-query";
import { useMovieSessionsQuery } from "@/entities/movie-sessions";
import { useCinemasQuery } from "@/entities/cinemas";
import { queryKeys } from "@/shared/api/queryKeys";
import { groupSessionsByCinemas } from "../lib/groupSessionsByCinemas";
import type { GroupedCinemaSessions } from "../model/types";

/**
 * Хук для получения сеансов фильма, сгруппированных по кинотеатрам
 */
export const useGroupedMovieSessionsQuery = (movieId: string) => {
  const { data: sessions, isLoading: sessionsLoading, isError: sessionsError } = useMovieSessionsQuery(movieId);
  const { data: cinemas, isLoading: cinemasLoading, isError: cinemasError } = useCinemasQuery();

  return useQuery({
    queryKey: [...queryKeys.movieSessions(Number(movieId)), "grouped"],
    queryFn: (): GroupedCinemaSessions[] => {
      if (!sessions || !cinemas) return [];
      return groupSessionsByCinemas(sessions, cinemas);
    },
    enabled: !!sessions && !!cinemas && !sessionsLoading && !cinemasLoading,
    staleTime: 5 * 60 * 1000,
    meta: {
      isLoading: sessionsLoading || cinemasLoading,
      isError: sessionsError || cinemasError,
    },
  });
};
