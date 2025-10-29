import { useQuery } from '@tanstack/react-query';
import { baseFetch } from '@/shared/api/baseFetch';
import { queryKeys } from '@/shared/api/queryKeys';
import type { MovieSession } from '../model/types';

const fetchMovieSessions = async (movieId: string): Promise<MovieSession[]> => {
  return baseFetch<MovieSession[]>(`/movies/${movieId}/sessions`);
};

export const useMovieSessionsQuery = (movieId: string) =>
  useQuery({
    queryKey: queryKeys.movieSessions(Number(movieId)),
    queryFn: () => fetchMovieSessions(movieId),
    staleTime: 5 * 60 * 1000,
    enabled: !!movieId,
  });
