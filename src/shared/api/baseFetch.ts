import { API_URL } from "../config";

export async function baseFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка запроса: ${response.status} — ${errorText}`);
  }

  return response.json();
}
