import React from 'react';
import { getImageUrl } from '@/shared/config';
import type { MoviePosterProps } from '../model/types';


export const MoviePoster: React.FC<MoviePosterProps> = ({ posterImage, title, lengthMinutes, description }) => {
  return (
    <div className='flex gap-6 items-start mb-4'>
      <img src={getImageUrl(posterImage)} alt={title} className='w-24 h-auto rounded-lg shadow-md' />
      <div className='flex-1'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <p className='text-gray-400 text-sm'>• {lengthMinutes} мин</p>
        <p className='mt-2 text-gray-300 text-sm line-clamp-2'>{description}</p>
      </div>
    </div>
  );
};

