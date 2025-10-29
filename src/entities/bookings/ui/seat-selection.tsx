import React, { useState } from 'react';
import type { Seat, SeatSelectionProps } from '../model/types';
import { SessionInfo } from './session-info';
import { SeatGrid } from './seat-grid';
import { SeatLegend } from './seat-legend';

export const SeatSelection: React.FC<SeatSelectionProps> = ({
  rows,
  seatsPerRow,
  bookedSeats,
  onSeatsChange,
  onBooking,
  movieTitle,
  cinemaName,
  sessionTime,
  isBookingLoading = false,
}) => {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const isSeatBooked = (row: number, seat: number) => {
    return bookedSeats.some((s) => s.rowNumber === row && s.seatNumber === seat);
  };

  const toggleSeat = (row: number, seat: number) => {
    if (isSeatBooked(row, seat)) return;

    const seatObj = { rowNumber: row, seatNumber: seat };
    const isSeatSelected = selectedSeats.some((s) => s.rowNumber === row && s.seatNumber === seat);
    
    let newSelectedSeats: Seat[];

    if (isSeatSelected) {
      newSelectedSeats = selectedSeats.filter((s) => !(s.rowNumber === row && s.seatNumber === seat));
    } else {
      newSelectedSeats = [...selectedSeats, seatObj];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatsChange(newSelectedSeats);
  };

  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='flex'>
        {/* Основная область выбора мест */}
        <div className='flex-1 p-8'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>Выбрать места</h2>

            <SessionInfo movieTitle={movieTitle} cinemaName={cinemaName} sessionTime={sessionTime} />

            <SeatGrid
              rows={rows}
              seatsPerRow={seatsPerRow}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onToggleSeat={toggleSeat}
            />

            <SeatLegend />

            {/* Кнопка бронирования */}
            <div className='text-center'>
              <button
                onClick={onBooking}
                disabled={selectedSeats.length === 0 || isBookingLoading}
                className='px-12 py-4 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg font-semibold text-lg transition-colors'
              >
                {isBookingLoading
                  ? 'Бронирование...'
                  : selectedSeats.length > 0
                    ? `Забронировать (${selectedSeats.length} мест)`
                    : 'Забронировать'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
