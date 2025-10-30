export const formatSeats = (seats: { rowNumber: number; seatNumber: number }[]) => {
  return seats.map((seat) => `Ряд ${seat.rowNumber}, Место ${seat.seatNumber}`).join(', ');
};
