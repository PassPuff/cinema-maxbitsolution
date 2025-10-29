import { useParams } from 'react-router-dom';
import { useCinemasQuery } from '@/entities/cinemas';
import { useGroupedCinemaSessionsQuery } from '@/features/cinema-sessions-grouping';
import { Button } from '@/shared/components/ui/button';
import { getImageUrl } from '@/shared/config';

export const CinemaSessions = () => {
  const { cinemaId } = useParams<{ cinemaId: string }>();
  const { data: cinemas } = useCinemasQuery();
  const { data, isLoading, isError } = useGroupedCinemaSessionsQuery(String(cinemaId));

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки сеансов</p>;
  if (!data?.length) return <p>Нет доступных сеансов в этом кинотеатре</p>;

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const cinema = cinemas?.find((c) => c.id === Number(cinemaId));

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold mb-4'>Расписание кинотеатра #{cinemaId}</h1>

      {/* 🔸 Информация о кинотеатре */}
      <div className='bg-gray-800 p-6 rounded-2xl'>
        <h1 className='text-3xl font-bold'>{cinema?.name}</h1>
        <p className='text-gray-400 mt-1'>{cinema?.address}</p>
      </div>

      {/* 🔸 Расписание по фильмам */}
      {data.map(({ movie, sessions }) => (
        <div key={movie.id} className='bg-gray-900 p-4 rounded-2xl'>
          <div className='flex gap-6 items-start mb-4'>
            <img src={getImageUrl(movie.posterImage)} alt={movie.title} className='w-24 h-auto rounded-lg shadow-md' />
            <div className='flex-1'>
              <h2 className='text-xl font-semibold'>{movie.title}</h2>
              <p className='text-gray-400 text-sm'>• {movie.lengthMinutes} мин</p>
              <p className='mt-2 text-gray-300 text-sm line-clamp-2'>{movie.description}</p>
            </div>
          </div>

          {/* Группируем сеансы по датам */}
          {(() => {
            const sessionsByDate = sessions.reduce(
              (acc, session) => {
                const date = formatDate(session.startTime);
                if (!acc[date]) acc[date] = [];
                acc[date].push(session);
                return acc;
              },
              {} as Record<string, typeof sessions>,
            );

            return Object.entries(sessionsByDate).map(([date, dateSessions]) => (
              <div key={date} className='mb-4 last:mb-0'>
                <h3 className='text-lg font-medium mb-2 text-gray-200'>{date}</h3>
                <ul className='flex flex-wrap gap-3'>
                  {dateSessions.map((session) => (
                    <li key={session.id}>
                      <Button onClick={() => alert(`Выбран сеанс #${session.id}`)}>
                        {formatTime(session.startTime)}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ));
          })()}
        </div>
      ))}
    </div>
  );
};
