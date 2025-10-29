import React from 'react';

interface SeatButtonProps {
  rowNumber: number;
  seatNumber: number;
  isBooked: boolean;
  isSelected: boolean;
  onToggle: (row: number, seat: number) => void;
}

export const SeatButton: React.FC<SeatButtonProps> = ({
  rowNumber,
  seatNumber,
  isBooked,
  isSelected,
  onToggle,
}) => {
  const baseClasses =
    'w-10 h-10 border-2 rounded cursor-pointer transition-colors duration-200 flex items-center justify-center text-xs font-medium';

  const getSeatClassName = () => {
    if (isBooked) {
      return `${baseClasses} bg-red-400 border-red-500 text-white cursor-not-allowed`;
    }

    if (isSelected) {
      return `${baseClasses} bg-blue-400 border-blue-500 text-white`;
    }

    return `${baseClasses} bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700`;
  };

  return (
    <button
      className={getSeatClassName()}
      onClick={() => onToggle(rowNumber, seatNumber)}
      disabled={isBooked}
      title={`Ряд ${rowNumber}, Место ${seatNumber}`}
    >
      {seatNumber}
    </button>
  );
};

