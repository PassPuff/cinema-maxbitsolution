import React, { useState } from 'react';
import type { Seat } from '../model/types';

interface SeatSelectionProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: Seat[];
  onSeatsChange: (seats: Seat[]) => void;
  onBooking: () => void;
  movieTitle?: string;
  cinemaName?: string;
  sessionTime?: string;
  isBookingLoading?: boolean;
}

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

  const isSeatSelected = (row: number, seat: number) => {
    return selectedSeats.some((s) => s.rowNumber === row && s.seatNumber === seat);
  };

  const toggleSeat = (row: number, seat: number) => {
    if (isSeatBooked(row, seat)) return;

    const seatObj = { rowNumber: row, seatNumber: seat };
    let newSelectedSeats: Seat[];

    if (isSeatSelected(row, seat)) {
      newSelectedSeats = selectedSeats.filter((s) => !(s.rowNumber === row && s.seatNumber === seat));
    } else {
      newSelectedSeats = [...selectedSeats, seatObj];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatsChange(newSelectedSeats);
  };

  const getSeatClassName = (row: number, seat: number) => {
    const baseClasses =
      'w-10 h-10 border-2 rounded cursor-pointer transition-colors duration-200 flex items-center justify-center text-xs font-medium';

    if (isSeatBooked(row, seat)) {
      return `${baseClasses} bg-red-400 border-red-500 text-white cursor-not-allowed`;
    }

    if (isSeatSelected(row, seat)) {
      return `${baseClasses} bg-blue-400 border-blue-500 text-white`;
    }

    return `${baseClasses} bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700`;
  };

  return (
    <div className='bg-black text-white min-h-screen'>
      <div className='flex'>
        {/* Основная область выбора мест */}
        <div className='flex-1 p-8'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-2xl font-bold mb-6'>Выбрать места</h2>

            {/* Информация о сеансе */}
            <div className='mb-8 p-4 bg-gray-800 rounded-lg'>
              {movieTitle && (
                <p className='text-lg'>
                  <strong>Фильм:</strong> {movieTitle}
                </p>
              )}
              {cinemaName && (
                <p className='text-gray-300'>
                  <strong>Кинотеатр:</strong> {cinemaName}
                </p>
              )}
              {sessionTime && (
                <p className='text-gray-300'>
                  <strong>Время:</strong> {sessionTime}
                </p>
              )}
            </div>

            {/* Номера мест сверху */}
            <div className='mb-4'>
              <div className='flex justify-center'>
                <div className='flex gap-2 ml-20'>
                  {Array.from({ length: seatsPerRow }, (_, i) => (
                    <div key={i} className='w-10 text-center text-sm text-gray-400 font-medium'>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ряды с местами */}
            <div className='space-y-3 mb-8'>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className='flex items-center justify-center gap-2'>
                  {/* Номер ряда */}
                  <div className='w-16 text-right text-sm text-gray-400 font-medium'>ряд {rowIndex + 1}</div>

                  {/* Места в ряду */}
                  <div className='flex gap-2'>
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                      <button
                        key={seatIndex}
                        className={getSeatClassName(rowIndex + 1, seatIndex + 1)}
                        onClick={() => toggleSeat(rowIndex + 1, seatIndex + 1)}
                        disabled={isSeatBooked(rowIndex + 1, seatIndex + 1)}
                        title={`Ряд ${rowIndex + 1}, Место ${seatIndex + 1}`}
                      >
                        {seatIndex + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Легенда */}
            <div className='flex justify-center gap-8 mb-8 text-sm'>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 bg-gray-800 border-2 border-gray-600 rounded'></div>
                <span>Свободно</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 bg-blue-400 border-2 border-blue-500 rounded'></div>
                <span>Выбрано</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 bg-red-400 border-2 border-red-500 rounded'></div>
                <span>Занято</span>
              </div>
            </div>

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
