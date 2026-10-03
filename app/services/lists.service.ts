import api from './api.service';

export type List = {
  id: number;
  title: string;
  position: number;
};

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getLists() {
  const response = await api.get<List[]>('/lists', {
    headers: getAuthHeaders(),
  });

  return response.data;
}

export async function createList(title: string) {
  const response = await api.post<List>(
    '/lists',
    { title },
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}