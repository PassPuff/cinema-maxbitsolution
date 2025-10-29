import { PageTitle } from '@/widgets/page-title';
import { useUserBookingsQuery } from '@/entities/bookings';
import { BookingCard } from '@/entities/bookings/ui/booking-card';
import React from 'react';

const BookingsPage: React.FC = () => {
  const { data: bookings, isLoading, isError } = useUserBookingsQuery();

  if (isLoading) return <div className='p-6'>Загрузка...</div>;
  if (isError) return <div className='p-6'>Ошибка загрузки билетов</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <PageTitle />
      <div className='space-y-6'>
        <div className='rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4'>Добро пожаловать !</h2>
          <p className='text-gray-600'>Ваши забронированные билеты:</p>
        </div>

        {!bookings || bookings.length === 0 ? (
          <div className='rounded-lg p-6 text-center'>
            <p className='text-gray-500'>У вас пока нет забронированных билетов</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
