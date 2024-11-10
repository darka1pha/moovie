'use server';
import { BASE_URL } from './actions/urls';

interface FetchOptions extends RequestInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export async function fetchData<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { headers = {} } = options;
  const requestUrl = BASE_URL + url;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const fetchOptions = {
    ...options,
    headers: defaultHeaders,
  };

  try {
    const response = await fetch(requestUrl, fetchOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    // Assuming the response is JSON, but you can customize it based on your API
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Error during fetch:', error);
    throw error;
  }
}
