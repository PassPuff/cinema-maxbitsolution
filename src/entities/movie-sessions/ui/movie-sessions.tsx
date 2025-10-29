import { useParams } from 'react-router-dom';
import { useMoviesQuery } from '@/entities/movies';
import { useGroupedMovieSessionsQuery } from '@/features/movie-sessions-grouping';
import { MovieInfo } from './movie-info';
import { CinemaSessionCard } from './cinema-session-card';

export const MovieSessions = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movies } = useMoviesQuery();
  const { data, isLoading, isError } = useGroupedMovieSessionsQuery(String(movieId));

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки сеансов</p>;
  if (!data?.length) return <p>Нет доступных сеансов для этого фильма</p>;

  const movie = movies?.find((m) => m.id === Number(movieId));

  return (
    <div className='p-6 space-y-6'>
      <MovieInfo
        posterImage={movie?.posterImage}
        title={movie?.title}
        lengthMinutes={movie?.lengthMinutes}
        description={movie?.description}
      />

      {data.map(({ cinema, sessions }) => (
        <CinemaSessionCard key={cinema.id} cinema={cinema} sessions={sessions} />
      ))}
    </div>
  );
};
