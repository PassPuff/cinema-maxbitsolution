import React from 'react';

export const SeatLegend: React.FC = () => {
  return (
    <div className='flex justify-center gap-8 mb-8 text-sm'>
      <div className='flex items-center gap-2'>
        <div className='w-6 h-6 bg-gray-800 border-2 border-gray-600 rounded'></div>
        <span>Свободно</span>
      </div>
      <div className='flex items-center gap-2'>
        <div className='w-6 h-6 bg-blue-400 border-2 border-blue-500 rounded'></div>
        <span>Выбрано</span>
      </div>
      <div className='flex items-center gap-2'>
        <div className='w-6 h-6 bg-red-400 border-2 border-red-500 rounded'></div>
        <span>Занято</span>
      </div>
    </div>
  );
};
