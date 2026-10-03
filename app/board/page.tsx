'use client';

import { useEffect, useState } from 'react';

import KanbanColumn from '../components/KanbanColumn';

import {
  createList,
  getLists,
  List,
} from '../services/lists.service';

import './board.css';

export default function BoardPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [message, setMessage] = useState('');

  // Permet de demander aux colonnes
  // de recharger leurs tâches.
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function loadLists() {
      try {
        const data = await getLists();
        setLists(data);
      } catch {
        setMessage('Impossible de récupérer les colonnes.');
      }
    }

    loadLists();
  }, []);

  async function handleAddList(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!newListTitle.trim()) {
      return;
    }

    try {
      const newList = await createList(
        newListTitle.trim(),
      );

      setLists((currentLists) => [
        ...currentLists,
        newList,
      ]);

      setNewListTitle('');
      setMessage('');
    } catch {
      setMessage("Impossible d'ajouter la colonne.");
    }
  }

  function handleTaskMoved() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <main className="board-page">
      <h1>Mon tableau Kanban</h1>

      <form
        onSubmit={handleAddList}
        className="add-list-form"
      >
        <input
          type="text"
          placeholder="Nom de la colonne"
          value={newListTitle}
          onChange={(event) =>
            setNewListTitle(event.target.value)
          }
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
            lists={lists}
            refreshKey={refreshKey}
            onTaskMoved={handleTaskMoved}
          />
        ))}
      </div>
    </main>
  );
}