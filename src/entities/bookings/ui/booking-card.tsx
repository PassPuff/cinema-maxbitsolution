import React from 'react';
import { useSessionDetailsQuery } from '../api/sessionApi';
import { useMoviesQuery } from '@/entities/movies';
import { useCinemasQuery } from '@/entities/cinemas';
import { getImageUrl } from '@/shared/config';
import { formatSeats } from '@/shared/lib/formatSeats';
import { formatDateTime } from '@/shared/lib/formatDateTime';

import type { BookingCardProps } from '../model/types';

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { data: sessionDetails } = useSessionDetailsQuery(booking.movieSessionId.toString());
  const { data: movies } = useMoviesQuery();
  const { data: cinemas } = useCinemasQuery();

  const movie = movies?.find((m) => m.id === sessionDetails?.movieId);
  const cinema = cinemas?.find((c) => c.id === sessionDetails?.cinemaId);

  if (!sessionDetails) {
    return (
      <div className='rounded-lg shadow-md p-6'>
        <p className='text-gray-500'>Загрузка информации о бронировании...</p>
      </div>
    );
  }

  return (
    <div className='rounded-lg shadow-md p-6'>
      <div className='flex gap-4'>
        {movie?.posterImage && (
          <img src={getImageUrl(movie.posterImage)} alt={movie.title} className='w-20 h-28 object-cover rounded' />
        )}
        <div className='flex-1'>
          <h3 className='text-lg font-semibold mb-2'>{movie?.title || 'Неизвестный фильм'}</h3>
          <p className='mb-1'>
            <strong>Кинотеатр:</strong> {cinema?.name || 'Неизвестный кинотеатр'}
          </p>
          <p className='mb-1'>
            <strong>Время сеанса:</strong> {formatDateTime(sessionDetails.startTime)}
          </p>
          <p className='mb-1'>
            <strong>Места:</strong> {formatSeats(booking.seats)}
          </p>
        </div>
      </div>
    </div>
  );
};
