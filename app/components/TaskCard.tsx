'use client';

import { useState } from 'react';

import {
  Card,
  UpdateCardData,
  updateCard,
  deleteCard,
} from '../services/cards.service';

import { List } from '../services/lists.service';

type TaskCardProps = {
  task: Card;
  lists: List[];
  currentListId: number;
  onTaskUpdated: (task: Card) => void;
  onTaskDeleted: (taskId: number) => void;
  onTaskMoved: () => void;
};

export default function TaskCard({
  task,
  lists,
  currentListId,
  onTaskUpdated,
  onTaskDeleted,
  onTaskMoved,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(
    task.description ?? '',
  );

  const [message, setMessage] = useState('');

  async function handleUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setMessage('');

    const changes: UpdateCardData = {};

    if (title.trim() !== task.title) {
      changes.title = title.trim();
    }

    if (description.trim() !== (task.description ?? '')) {
      changes.description = description.trim();
    }

    if (Object.keys(changes).length === 0) {
      setIsEditing(false);
      return;
    }

    try {
      const updatedTask = await updateCard(
        task.id,
        changes,
      );

      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch {
      setMessage('Impossible de modifier la tâche.');
    }
  }

  async function handleDelete() {
    try {
      await deleteCard(task.id);
      onTaskDeleted(task.id);
    } catch {
      setMessage('Impossible de supprimer la tâche.');
    }
  }

  async function handleMove(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const destinationListId = Number(event.target.value);

    if (destinationListId === currentListId) {
      return;
    }

    setMessage('');

    try {
      await updateCard(task.id, {
        listId: destinationListId,
      });

      onTaskMoved();
    } catch {
      setMessage('Impossible de déplacer la tâche.');
    }
  }

  if (isEditing) {
    return (
      <div className="kanban-card">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />

          <button type="submit">
            Enregistrer
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Annuler
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="kanban-card">
      <strong>{task.title}</strong>

      {task.description && (
        <p>{task.description}</p>
      )}

      <button
        type="button"
        onClick={() => setIsEditing(true)}
      >
        Modifier
      </button>

      <button
        type="button"
        onClick={handleDelete}
      >
        Supprimer
      </button>

      <div className="task-move">
        <label htmlFor={`move-task-${task.id}`}>
          Déplacer vers
        </label>

        <select
          id={`move-task-${task.id}`}
          value={currentListId}
          onChange={handleMove}
        >
          {lists.map((list) => (
            <option
              key={list.id}
              value={list.id}
            >
              {list.title}
            </option>
          ))}
        </select>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}