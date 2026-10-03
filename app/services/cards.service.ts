import api from './api.service';

export type Card = {
  id: number;
  title: string;
  description?: string;
  position: number;
};

type CreateCardData = {
  title: string;
  description?: string;
};

export type UpdateCardData = {
  title?: string;
  description?: string;
  position?: number;
  listId?: number;
};

function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getCards(listId: number) {
  const response = await api.get<Card[]>(
    `/lists/${listId}/cards`,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}

export async function createCard(
  listId: number,
  data: CreateCardData,
) {
  const response = await api.post<Card>(
    `/lists/${listId}/cards`,
    data,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}

export async function updateCard(
  cardId: number,
  changes: UpdateCardData,
) {
  const response = await api.patch<Card>(
    `/cards/${cardId}`,
    changes,
    {
      headers: getAuthHeaders(),
    },
  );

  return response.data;
}

export async function deleteCard(cardId: number) {
  await api.delete(
    `/cards/${cardId}`,
    {
      headers: getAuthHeaders(),
    },
  );
}