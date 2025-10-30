import React from 'react';
import { getImageUrl } from '@/shared/config';
import type { MovieInfoProps } from '../model/types';

export const MovieInfo: React.FC<MovieInfoProps> = ({ posterImage, title, lengthMinutes, description }) => {
  return (
    <div className='flex gap-6 items-start'>
      <img src={getImageUrl(posterImage)} alt={title} className='w-40 h-auto rounded-lg shadow-md' />
      <div>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='text-gray-500 mt-1'>• {lengthMinutes} мин</p>
        <p className='mt-4 text-gray-400 max-w-2xl'>{description}</p>
      </div>
    </div>
  );
};
