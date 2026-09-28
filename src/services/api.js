const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:3000/api';

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    const contentType =
      response.headers.get('content-type');

    let data = null;

    if (
      contentType &&
      contentType.includes('application/json')
    ) {
      data = await response.json();
    }

    if (!response.ok) {
      const message =
        Array.isArray(data?.message)
          ? data.message.join(' · ')
          : data?.message ||
            'An error occurred.';

      const error = new Error(message);

      error.status = response.status;
      error.data = data;

      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        'Unable to contact the server.'
      );
    }

    throw error;
  }
}

export {
  API_URL,
  apiRequest,
};