import React from 'react';

interface SessionInfoProps {
  movieTitle?: string;
  cinemaName?: string;
  sessionTime?: string;
}

export const SessionInfo: React.FC<SessionInfoProps> = ({ movieTitle, cinemaName, sessionTime }) => {
  return (
    <div className='mb-8 p-4 bg-gray-800 rounded-lg'>
      {movieTitle && (
        <p className='text-lg'>
          <strong>Фильм:</strong> {movieTitle}
        </p>
      )}
      {cinemaName && (
        <p className='text-gray-300'>
          <strong>Кинотеатр:</strong> {cinemaName}
        </p>
      )}
      {sessionTime && (
        <p className='text-gray-300'>
          <strong>Время:</strong> {sessionTime}
        </p>
      )}
    </div>
  );
};

