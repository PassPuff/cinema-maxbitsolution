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
    <div className='p-4 border-b border-gray-700'>
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

