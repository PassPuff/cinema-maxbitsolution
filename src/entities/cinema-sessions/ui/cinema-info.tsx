import React from 'react';
import type { CinemaInfoProps } from '../model/types';

export const CinemaInfo: React.FC<CinemaInfoProps> = ({ name, address }) => {
  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold'>{name}</h1>
      <p className='mt-1'>{address}</p>
    </div>
  );
};
