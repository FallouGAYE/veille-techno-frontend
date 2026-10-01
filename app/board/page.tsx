'use client';

import { useEffect, useState } from 'react';
import KanbanColumn from '../components/KanbanColumn';
import './board.css';

type List = {
  id: number;
  title: string;
};

export default function BoardPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [message, setMessage] = useState('');

  // Récupérer les colonnes au chargement de la page
  useEffect(() => {
    async function getLists() {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        setMessage('Vous devez être connecté.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/lists', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setMessage('Impossible de récupérer les colonnes.');
          return;
        }

        const data = await response.json();

        setLists(data);
      } catch {
        setMessage('Impossible de contacter le serveur.');
      }
    }

    getLists();
  }, []);

  // Ajouter une nouvelle colonne
  async function addList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newListTitle.trim()) {
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      setMessage('Vous devez être connecté.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/lists', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title: newListTitle.trim(),
        }),
      });

      if (!response.ok) {
        setMessage("Impossible d'ajouter la colonne.");
        return;
      }

      const newList = await response.json();

      setLists([...lists, newList]);
      setNewListTitle('');
      setMessage('');
    } catch {
      setMessage('Impossible de contacter le serveur.');
    }
  }

  return (
    <main className="board-page">
      <h1>Mon tableau Kanban</h1>

      <form onSubmit={addList} className="add-list-form">
        <input
          type="text"
          placeholder="Nom de la colonne"
          value={newListTitle}
          onChange={(event) => setNewListTitle(event.target.value)}
        />

        <button type="submit">
          Ajouter
        </button>
      </form>

      {message && <p>{message}</p>}

      <div className="kanban-board">
        {lists.map((list) => (
         <KanbanColumn
            key={list.id}
            id={list.id}
            title={list.title}
            tasks={[]}
            />
        ))}
      </div>
    </main>
  );
}