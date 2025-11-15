interface FetchWrapperParams {
  url: string;
  method?: string;
  options?: RequestInit;
  data?: any;
}

export const host = "http://localhost:8080/api/v1/";

export async function fetchWrapper<T>({url, method = "GET", options = {}, data}: FetchWrapperParams): Promise<T> {
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: data ? JSON.stringify(data) : null,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
}