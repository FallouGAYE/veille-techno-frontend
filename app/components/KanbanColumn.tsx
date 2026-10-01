'use client';

import { useEffect, useState } from 'react';

type Task = {
  id: number;
  title: string;
  description?: string;
};

type KanbanColumnProps = {
  id: number;
  title: string;
};

export default function KanbanColumn({
  id,
  title,
}: KanbanColumnProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Récupérer les tâches de cette colonne
  useEffect(() => {
    async function getTasks() {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/lists/${id}/cards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          setMessage('Impossible de récupérer les tâches.');
          return;
        }

        const data = await response.json();

        setTasks(data);
      } catch {
        setMessage('Impossible de contacter le serveur.');
      }
    }

    getTasks();
  }, [id]);

  // Ajouter une tâche
  async function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      setMessage('Vous devez être connecté.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/lists/${id}/cards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: taskTitle.trim(),
            description: description.trim(),
          }),
        },
      );

      if (!response.ok) {
        setMessage("Impossible d'ajouter la tâche.");
        return;
      }

      const newTask = await response.json();

      setTasks([...tasks, newTask]);

      setTaskTitle('');
      setDescription('');
      setMessage('');
    } catch {
      setMessage('Impossible de contacter le serveur.');
    }
  }

  return (
    <section className="kanban-column">
      <h2>{title}</h2>

      {tasks.map((task) => (
        <div className="kanban-card" key={task.id}>
          <strong>{task.title}</strong>

          {task.description && (
            <p>{task.description}</p>
          )}
        </div>
      ))}

      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">
          Ajouter une tâche
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}