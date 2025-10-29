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
    <div className='bg-gray-900 p-4 rounded-2xl'>
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

