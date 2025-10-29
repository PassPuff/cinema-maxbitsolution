import { useQuery } from '@tanstack/react-query';
import { baseFetch } from '@/shared/api/baseFetch';
import { queryKeys } from '@/shared/api/queryKeys';
import type { Cinema } from '../model/types';

async function fetchCinemas(): Promise<Cinema[]> {
  return baseFetch<Cinema[]>('/cinemas');
}

export const useCinemasQuery = () =>
  useQuery({
    queryKey: queryKeys.cinemas,
    queryFn: fetchCinemas,
    staleTime: 5 * 60 * 1000,
  });
