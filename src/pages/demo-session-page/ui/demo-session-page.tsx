import React, { useState } from 'react';
import { SeatSelection } from '@/entities/bookings/ui/seat-selection';
import type { Seat } from '@/entities/bookings/model/types';

const DemoSessionPage: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // Тестовые данные согласно API документации
  const mockBookedSeats: Seat[] = [
    { rowNumber: 2, seatNumber: 4 },
    { rowNumber: 2, seatNumber: 5 },
    { rowNumber: 2, seatNumber: 6 },
    { rowNumber: 3, seatNumber: 5 },
    { rowNumber: 4, seatNumber: 3 },
  ];

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;

    alert(`Забронированы места: ${selectedSeats.map((s) => `Ряд ${s.rowNumber}, Место ${s.seatNumber}`).join(', ')}`);
    console.log('Забронированные места:', selectedSeats);
  };

  return (
    <SeatSelection
      rows={6}
      seatsPerRow={10}
      bookedSeats={mockBookedSeats}
      onSeatsChange={setSelectedSeats}
      onBooking={handleBooking}
      movieTitle='Темный рыцарь'
      cinemaName='Skyline Cinema'
      sessionTime='24.07, 17:30'
      isBookingLoading={false}
    />
  );
};

export default DemoSessionPage;
