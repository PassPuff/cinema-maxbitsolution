import React, { useState, useEffect } from 'react';
import { useSessionDetailsQuery } from '../api/sessionApi';
import { useMoviesQuery } from '@/entities/movies';
import { useCinemasQuery } from '@/entities/cinemas';
import { formatSeats } from '@/shared/lib/formatSeats';
import { formatDateTime ,formatTimeLeft} from '@/shared/lib/formatDateTime';
import { Button } from '@/shared/components';

import type { BookingCardProps } from '../model/types';

const BOOKING_EXPIRATION_MINUTES = 5;

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onPayment }) => {
  const { data: sessionDetails } = useSessionDetailsQuery(booking.movieSessionId.toString());
  const { data: movies } = useMoviesQuery();
  const { data: cinemas } = useCinemasQuery();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const movie = movies?.find((m) => m.id === sessionDetails?.movieId);
  const cinema = cinemas?.find((c) => c.id === sessionDetails?.cinemaId);

  // Таймер для неоплаченных бронирований
  useEffect(() => {
    if (!booking.isPaid && booking.bookedAt) {
      const updateTimer = () => {
        const bookedTime = new Date(booking.bookedAt).getTime();
        const expirationTime = bookedTime + BOOKING_EXPIRATION_MINUTES * 60 * 1000;
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expirationTime - now) / 1000));
        setTimeLeft(remaining);
      };

      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [booking.isPaid, booking.bookedAt]);



  if (!sessionDetails) {
    return (
      <div className='rounded-lg shadow-md p-6'>
        <p className='text-gray-500'>Загрузка информации о бронировании...</p>
      </div>
    );
  }

  return (
    <div className='flex items-start gap-6 py-4 border-b border-gray-800 last:border-b-0'>
      <div className='flex-1'>
        <h3 className='text-lg font-medium mb-1'>{movie?.title || 'Неизвестный фильм'}</h3>
        <p className='text-gray-400 mb-1'>{cinema?.name || 'Неизвестный кинотеатр'}</p>
        <p className='text-gray-400'>{formatDateTime(sessionDetails.startTime)}</p>
      </div>

      <div className='text-left'>
        <p className='text-gray-300'>{formatSeats(booking.seats)}</p>
      </div>

      {!booking.isPaid && (
        <>
          <div className='text-center'>
            <Button
              onClick={() => onPayment?.(booking.id)}
              variant="default"
            >
              Оплатить
            </Button>
          </div>

          {timeLeft !== null && (
            <div className='text-right min-w-[140px]'>
              <p className='text-gray-300'>Осталось {formatTimeLeft(timeLeft)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
