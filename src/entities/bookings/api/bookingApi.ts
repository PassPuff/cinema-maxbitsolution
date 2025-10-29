import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { baseFetch } from '@/shared/api/baseFetch';
import type { BookingRequest, UserBooking } from '../model/types';

export const useCreateBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, bookingData }: { sessionId: string; bookingData: BookingRequest }) =>
      baseFetch(`/movieSessions/${sessionId}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      }),
    onSuccess: () => {
      // Инвалидируем кэш бронирований пользователя и деталей сеанса
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};

export const useUserBookingsQuery = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => baseFetch<UserBooking[]>('/me/bookings'),
  });
};
