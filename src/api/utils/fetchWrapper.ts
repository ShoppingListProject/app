interface FetchWrapperParams {
  url: string
  options?: RequestInit
}

export const host = "http://localhost:8080/api/v1/";

export async function fetchWrapper<T>({url, options = {}}: FetchWrapperParams): Promise<T> {
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
}