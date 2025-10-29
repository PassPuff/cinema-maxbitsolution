export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3022';

/**
 * Хелпер для получения полного URL изображения
 */
export const getImageUrl = (path?: string): string => {
  if (!path) return '';
  return `${API_URL}${path}`;
};
