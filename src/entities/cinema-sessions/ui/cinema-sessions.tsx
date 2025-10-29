import { useParams } from 'react-router-dom';
import { useCinemasQuery } from '@/entities/cinemas';
import { useGroupedCinemaSessionsQuery } from '@/features/cinema-sessions-grouping';
import { CinemaInfo } from './cinema-info';
import { MovieSessionsCard } from './movie-sessions-card';

export const CinemaSessions = () => {
  const { cinemaId } = useParams<{ cinemaId: string }>();
  const { data: cinemas } = useCinemasQuery();
  const { data, isLoading, isError } = useGroupedCinemaSessionsQuery(String(cinemaId));

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки сеансов</p>;
  if (!data?.length) return <p>Нет доступных сеансов в этом кинотеатре</p>;

  const cinema = cinemas?.find((c) => c.id === Number(cinemaId));

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold mb-4'>Расписание кинотеатра #{cinemaId}</h1>

      <CinemaInfo name={cinema?.name} address={cinema?.address} />

      {/* 🔸 Расписание по фильмам */}
      {data.map(({ movie, sessions }) => (
        <MovieSessionsCard key={movie.id} movie={movie} sessions={sessions} />
      ))}
    </div>
  );
};
