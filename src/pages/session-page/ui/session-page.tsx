import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSessionDetailsQuery } from '@/entities/bookings/api/sessionApi';
import { useCreateBookingMutation } from '@/entities/bookings/api/bookingApi';
import type { Seat } from '@/entities/bookings/model/types';
import { SeatSelection } from '@/entities/bookings/ui/seat-selection';
import { useMoviesQuery } from '@/entities/movies';
import { useCinemasQuery } from '@/entities/cinemas';

const SessionPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const handleSeatsChange = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };

  const { data: sessionDetails, isLoading, isError } = useSessionDetailsQuery(sessionId!);
  const { data: movies } = useMoviesQuery();
  const { data: cinemas } = useCinemasQuery();
  const createBookingMutation = useCreateBookingMutation();

  if (isLoading) return <div className='text-white p-6'>Загрузка...</div>;
  if (isError || !sessionDetails) return <div className='text-white p-6'>Ошибка загрузки сеанса</div>;

  const movie = movies?.find((m) => m.id === sessionDetails.movieId);
  const cinema = cinemas?.find((c) => c.id === sessionDetails.cinemaId);

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;

    try {
      await createBookingMutation.mutateAsync({
        sessionId: sessionId!,
        bookingData: { seats: selectedSeats },
      });

      navigate('/bookings');
    } catch (error) {
      console.error('Ошибка при бронировании:', error);
      alert(`Ошибка при бронировании мест: ${error}`);
    }
  };

  return (
    <SeatSelection
      rows={sessionDetails.seats.rows}
      seatsPerRow={sessionDetails.seats.seatsPerRow}
      bookedSeats={sessionDetails.bookedSeats}
      onSeatsChange={handleSeatsChange}
      onBooking={handleBooking}
      movieTitle={movie?.title || ''}
      cinemaName={cinema?.name || ''}
      sessionTime={formatTime(sessionDetails.startTime)}
      isBookingLoading={createBookingMutation.isPending}
    />
  );
};

export default SessionPage;
