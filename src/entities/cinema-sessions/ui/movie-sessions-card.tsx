import React from 'react';
import type { Movie } from '@/entities/movies';
import type { MovieSession } from '../model/types';
import { MoviePoster } from './movie-poster';
import { SessionsByDate } from './sessions-by-date';

interface MovieSessionsCardProps {
  movie: Movie;
  sessions: MovieSession[];
}

export const MovieSessionsCard: React.FC<MovieSessionsCardProps> = ({ movie, sessions }) => {
  return (
    <div className='p-4 border-b border-gray-700'>
      <MoviePoster
        posterImage={movie.posterImage || ''}
        title={movie.title}
        lengthMinutes={movie.lengthMinutes || 0}
        description={movie.description || ''}
      />
      <SessionsByDate sessions={sessions} />
    </div>
  );
};
