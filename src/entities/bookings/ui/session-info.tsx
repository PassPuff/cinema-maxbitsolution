import React from 'react';
import type { SessionInfoProps } from '../model/types';


export const SessionInfo: React.FC<SessionInfoProps> = ({ movieTitle, cinemaName, sessionTime }) => {
  return (
    <div>
      {movieTitle && (
        <h3 className='text-lg font-normal mb-1'>
          {movieTitle}
        </h3>
      )}
      {cinemaName && (
        <p className='text-base mb-1'>
          {cinemaName}
        </p>
      )}
      {sessionTime && (
        <p className='text-base'>
          {sessionTime}
        </p>
      )}
    </div>
  );
};

