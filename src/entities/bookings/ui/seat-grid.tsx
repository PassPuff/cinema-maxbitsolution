import React from 'react';
import { SeatButton } from './seat-button';
import type { Seat } from '../model/types';

interface SeatGridProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: Seat[];
  selectedSeats: Seat[];
  onToggleSeat: (row: number, seat: number) => void;
}

export const SeatGrid: React.FC<SeatGridProps> = ({ rows, seatsPerRow, bookedSeats, selectedSeats, onToggleSeat }) => {
  const isSeatBooked = (row: number, seat: number) => {
    return bookedSeats.some((s) => s.rowNumber === row && s.seatNumber === seat);
  };

  const isSeatSelected = (row: number, seat: number) => {
    return selectedSeats.some((s) => s.rowNumber === row && s.seatNumber === seat);
  };

  return (
    <div className='mb-8'>
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
      <div className='space-y-3'>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className='flex items-center justify-center gap-2'>
            {/* Номер ряда */}
            <div className='w-16 text-right text-sm text-gray-400 font-medium'>ряд {rowIndex + 1}</div>

            {/* Места в ряду */}
            <div className='flex gap-2'>
              {Array.from({ length: seatsPerRow }, (_, seatIndex) => (
                <SeatButton
                  key={seatIndex}
                  rowNumber={rowIndex + 1}
                  seatNumber={seatIndex + 1}
                  isBooked={isSeatBooked(rowIndex + 1, seatIndex + 1)}
                  isSelected={isSeatSelected(rowIndex + 1, seatIndex + 1)}
                  onToggle={onToggleSeat}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
