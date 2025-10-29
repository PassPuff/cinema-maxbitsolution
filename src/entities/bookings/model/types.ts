export interface Seat {
  rowNumber: number;
  seatNumber: number;
}

export interface SessionDetails {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: {
    rows: number;
    seatsPerRow: number;
  };
  bookedSeats: Seat[];
}

export interface BookingRequest {
  seats: Seat[];
}

// Согласно API документации - ответ от /me/bookings
export interface UserBooking {
  id: number;
  movieSessionId: number;
  seats: Seat[];
}

// Расширенный тип для отображения с дополнительной информацией
export interface BookingWithDetails extends UserBooking {
  session?: SessionDetails;
  movie?: {
    id: number;
    title: string;
    posterImage?: string;
  };
  cinema?: {
    id: number;
    name: string;
    address?: string;
  };
}

export interface BookingCardProps {
  booking: UserBooking;
}

export interface SeatSelectionProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: Seat[];
  onSeatsChange: (seats: Seat[]) => void;
  onBooking: () => void;
  movieTitle: string;
  cinemaName: string;
  sessionTime: string;
  isBookingLoading: boolean;
}