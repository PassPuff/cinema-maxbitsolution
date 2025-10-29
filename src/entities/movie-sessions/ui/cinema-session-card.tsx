import React from 'react';
import type { Cinema } from '@/entities/cinemas';
import type { MovieSession } from '../model/types';
import { SessionTimeList } from './session-time-list';

interface CinemaSessionCardProps {
  cinema: Cinema;
  sessions: MovieSession[];
}

export const CinemaSessionCard: React.FC<CinemaSessionCardProps> = ({ cinema, sessions }) => {
  return (
    <div className='bg-gray-900 p-4 rounded-2xl'>
      <div className='flex justify-between items-center mb-3'>
        <div>
          <h2 className='text-lg font-semibold'>{cinema.name}</h2>
          <p className='text-gray-400 text-sm'>{cinema.address}</p>
        </div>
      </div>
      <SessionTimeList sessions={sessions} />
    </div>
  );
};

