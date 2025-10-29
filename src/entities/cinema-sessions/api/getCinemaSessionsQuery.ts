import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "@/shared/api/baseFetch";
import { queryKeys } from "@/shared/api/queryKeys";
import type { MovieSession } from "../model/types";

const fetchCinemaSessions = async (cinemaId: string): Promise<MovieSession[]> => {
  return baseFetch<MovieSession[]>(`/cinemas/${cinemaId}/sessions`);
};

export const useCinemaSessionsQuery = (cinemaId: string) =>
  useQuery({
    queryKey: queryKeys.cinemaSessions(Number(cinemaId)),
    queryFn: () => fetchCinemaSessions(cinemaId),
    staleTime: 5 * 60 * 1000,
    enabled: !!cinemaId,
  });
