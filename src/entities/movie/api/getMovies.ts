import { useQuery } from '@tanstack/react-query';
// import { baseFetch } from '@/shared/api/baseApi';
import { baseFetch } from '../../../shared/api/baseFetch';
import { queryKeys } from '../../../shared/api/queryKeys';
import type { Movie } from '../model/types';

async function fetchMovies(): Promise<Movie[]> {
    return baseFetch<Movie[]>('/movies');
}

export const useMoviesQuery = () =>
    useQuery({
        queryKey: queryKeys.movies,
        queryFn: fetchMovies,
        staleTime: 5 * 60 * 1000,
    })