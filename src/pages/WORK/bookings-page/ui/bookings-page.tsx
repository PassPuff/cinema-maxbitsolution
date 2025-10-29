import { PageTitle } from '@/widgets/page-title';
import { useAuth } from '@/app/providers/use-auth';
import React from 'react';

const BookingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className='container mx-auto px-4 py-8'>
      <PageTitle />
      <div className='space-y-6'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4'>Добро пожаловать, {user?.username}!</h2>
          <p className='text-gray-600'>Здесь будут отображаться ваши забронированные билеты.</p>
        </div>

        <div className='bg-gray-50 rounded-lg p-6 text-center'>
          <p className='text-gray-500'>У вас пока нет забронированных билетов</p>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
