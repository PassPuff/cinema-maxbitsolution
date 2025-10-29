import { useQuery } from '@tanstack/react-query';
import { baseFetch } from '@/shared/api/baseFetch';
import type { SessionDetails } from '../model/types';

export const useSessionDetailsQuery = (sessionId: string) => {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => baseFetch<SessionDetails>(`/movieSessions/${sessionId}`),
    enabled: !!sessionId,
  });
};
