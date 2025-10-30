import { useUserBookingsQuery, usePayBookingMutation } from '@/entities/bookings';
import { BookingCard } from '@/entities/bookings/ui/booking-card';
import React, { useMemo } from 'react';
import type { UserBooking } from '@/entities/bookings';

const BookingsPage: React.FC = () => {
  const { data: bookings, isLoading, isError } = useUserBookingsQuery();
  const payBookingMutation = usePayBookingMutation();

  const groupedBookings = useMemo(() => {
    if (!bookings) return { unpaid: [], upcoming: [], past: [] };

    const unpaid: UserBooking[] = [];
    const upcoming: UserBooking[] = [];
    const past: UserBooking[] = [];

    bookings.forEach((booking) => {
      if (!booking.isPaid) {
        unpaid.push(booking);
      } else {
        upcoming.push(booking);
      }
    });

    return { unpaid, upcoming, past };
  }, [bookings]);

  const handlePayment = async (bookingId: string) => {
    try {
      await payBookingMutation.mutateAsync(bookingId);
    } catch (error) {
      console.error('Ошибка оплаты:', error);
    }
  };

  if (isLoading) return <div className='p-6'>Загрузка...</div>;
  if (isError) return <div className='p-6'>Ошибка загрузки билетов</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      {!bookings || bookings.length === 0 ? (
        <div className='rounded-lg p-6 text-center'>
          <p className='text-gray-500'>У вас пока нет забронированных билетов</p>
        </div>
      ) : (
        <div className='space-y-8'>
          {/* Не оплаченные */}
          {groupedBookings.unpaid.length > 0 && (
            <div>
              <h2 className='text-xl font-medium mb-4'>Не оплаченные</h2>
              <div className='border-t border-gray-800'>
                {groupedBookings.unpaid.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onPayment={handlePayment} />
                ))}
              </div>
            </div>
          )}

          {/* Будущие */}
          {groupedBookings.upcoming.length > 0 && (
            <div>
              <h2 className='text-xl font-medium mb-4'>Будущие</h2>
              <div className='border-t border-gray-800'>
                {groupedBookings.upcoming.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onPayment={handlePayment} />
                ))}
              </div>
            </div>
          )}

          {/* Прошедшие */}
          {groupedBookings.past.length > 0 && (
            <div>
              <h2 className='text-xl font-medium mb-4'>Прошедшие</h2>
              <div className='border-t border-gray-800'>
                {groupedBookings.past.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onPayment={handlePayment} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
