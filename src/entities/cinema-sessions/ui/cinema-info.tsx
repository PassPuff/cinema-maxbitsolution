import React from 'react';
import type { CinemaInfoProps } from '../model/types';

export const CinemaInfo: React.FC<CinemaInfoProps> = ({ name, address }) => {
  return (
    <div className='bg-gray-800 p-6 rounded-2xl'>
      <h1 className='text-3xl font-bold'>{name}</h1>
      <p className='text-gray-400 mt-1'>{address}</p>
    </div>
  );
};

