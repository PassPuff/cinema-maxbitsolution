import { useParams } from 'react-router-dom';
import { useMoviesQuery } from '@/entities/movies';
import { useGroupedMovieSessionsQuery } from '@/features/movie-sessions-grouping';
import { Button } from '@/shared/components/ui/button';
import { getImageUrl } from '@/shared/config';

export const MovieSessions = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movies } = useMoviesQuery();
  const { data, isLoading, isError } = useGroupedMovieSessionsQuery(String(movieId));

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки сеансов</p>;
  if (!data?.length) return <p>Нет доступных сеансов для этого фильма</p>;

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const movie = movies?.find((m) => m.id === Number(movieId));

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold mb-4'>Сеансы фильма #{movieId}</h1>
      {/* 🔸 Информация о фильме */}
      <div className='flex gap-6 items-start'>
        <img src={getImageUrl(movie?.posterImage)} alt={movie?.title} className='w-40 h-auto rounded-lg shadow-md' />
        <div>
          <h1 className='text-3xl font-bold'>{movie?.title}</h1>
          <p className='text-gray-500 mt-1'>• {movie?.lengthMinutes} мин</p>
          <p className='mt-4 text-gray-700 max-w-2xl'>{movie?.description}</p>
        </div>
      </div>
      {data.map(({ cinema, sessions }) => (
        <div key={cinema.id} className='bg-gray-900 p-4 rounded-2xl'>
          <div className='flex justify-between items-center mb-3'>
            <div>
              <h2 className='text-lg font-semibold'>{cinema.name}</h2>
              <p className='text-gray-400 text-sm'>{cinema.address}</p>
            </div>
          </div>

          <ul className='flex flex-wrap gap-3'>
            {sessions.map((s) => (
              <li key={s.id}>
                <Button onClick={() => alert(`Выбран сеанс #${s.id}`)}>{formatTime(s.startTime)}</Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
