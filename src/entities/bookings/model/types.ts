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

export interface UserBooking {
  id: string;
  movieSessionId: number;
  userId: number;
  isPaid: boolean;
  seats: Seat[];
  bookedAt: string;
}

export interface SessionInfoProps {
  movieTitle?: string;
  cinemaName?: string;
  sessionTime?: string;
}

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
  onPayment?: (bookingId: string) => void;
}

export interface SeatSelectionProps {
  rows: number;
  seatsPerRow: number;
  bookedSeats: Seat[];
  onSeatsChange: (seats: Seat[]) => void;
  onBooking: () => void;
  movieTitle?: string;
  cinemaName?: string;
  sessionTime?: string;
  isBookingLoading: boolean;
}