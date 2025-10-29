import { API_URL } from '../config';

export async function baseFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers: Record<string, string> = {
    ...((options?.headers as Record<string, string>) || {}),
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка запроса: ${response.status} — ${errorText}`);
  }

  return response.json();
}
