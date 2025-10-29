import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { formatDate, formatTime } from '@/shared/lib/formatDateTime';
import type { MovieSession } from '../model/types';
import type { SessionsByDateProps } from '../model/types';


export const SessionsByDate: React.FC<SessionsByDateProps> = ({ sessions }) => {
  const navigate = useNavigate();

  const sessionsByDate = sessions.reduce(
    (acc, session) => {
      const date = formatDate(session.startTime);
      if (!acc[date]) acc[date] = [];
      acc[date].push(session);
      return acc;
    },
    {} as Record<string, MovieSession[]>,
  );

  return (
    <>
      {Object.entries(sessionsByDate).map(([date, dateSessions]) => (
        <div key={date} className='mb-4 last:mb-0'>
          <h3 className='text-lg font-medium mb-2 text-gray-200'>{date}</h3>
          <ul className='flex flex-wrap gap-3'>
            {dateSessions.map((session) => (
              <li key={session.id}>
                <Button onClick={() => navigate(`/sessions/${session.id}`)}>
                  {formatTime(session.startTime)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

