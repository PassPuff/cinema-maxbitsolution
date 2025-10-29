import { useCinemasQuery } from '../api/getCinemas';
import { Button } from '@/shared/components/ui/button';
import type { CinemaListProps } from '../model/types';

export const CinemaList = ({ onCinemaClick }: CinemaListProps) => {
  const { data: cinemas, isLoading, isError } = useCinemasQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки фильмов</p>;
  return (
    <div className='p-6'>
      <div className='grid grid-cols-3 gap-4 font-semibold mb-2'>
        <span>Кинотеатр</span>
        <span>Адрес</span>
      </div>
      <hr className='border-gray-700' />

      <ul className='space-y-2'>
        {cinemas?.map((cinema) => (
          <li
            key={cinema.id}
            className='grid grid-cols-3 gap-4 items-center p-4'
          >
            <span>{cinema.name}</span>
            <span>{cinema.address}</span>
            <Button className='max-w-max' onClick={() => onCinemaClick(cinema.id)}>
              Посмотреть
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
