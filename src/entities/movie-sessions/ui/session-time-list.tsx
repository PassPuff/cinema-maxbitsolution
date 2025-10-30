import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { formatTime } from '@/shared/lib/formatDateTime';
import type { SessionTimeListProps } from '../model/types';

export const SessionTimeList: React.FC<SessionTimeListProps> = ({ sessions }) => {
  const navigate = useNavigate();

  return (
    <ul className='flex flex-wrap gap-3'>
      {sessions.map((s) => (
        <li key={s.id}>
          <Button onClick={() => navigate(`/sessions/${s.id}`)}>{formatTime(s.startTime)}</Button>
        </li>
      ))}
    </ul>
  );
};
