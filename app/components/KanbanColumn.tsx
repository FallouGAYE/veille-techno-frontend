'use client';

import { useEffect, useState } from 'react';

import TaskCard from './TaskCard';

import {
  Card,
  createCard,
  getCards,
} from '../services/cards.service';

import { List } from '../services/lists.service';

type KanbanColumnProps = {
  id: number;
  title: string;
  lists: List[];
  refreshKey: number;
  onTaskMoved: () => void;
};

export default function KanbanColumn({
  id,
  title,
  lists,
  refreshKey,
  onTaskMoved,
}: KanbanColumnProps) {
  const [tasks, setTasks] = useState<Card[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await getCards(id);
        setTasks(data);
      } catch {
        setMessage('Impossible de récupérer les tâches.');
      }
    }

    loadCards();
  }, [id, refreshKey]);

  async function handleAddTask(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!taskTitle.trim()) {
      return;
    }

    try {
      const newTask = await createCard(id, {
        title: taskTitle.trim(),
        description: description.trim(),
      });

      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);

      setTaskTitle('');
      setDescription('');
      setMessage('');
    } catch {
      setMessage("Impossible d'ajouter la tâche.");
    }
  }

  function handleTaskUpdated(updatedTask: Card) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task,
      ),
    );
  }

  function handleTaskDeleted(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId,
      ),
    );
  }

  return (
    <section className="kanban-column">
      <h2>{title}</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          lists={lists}
          currentListId={id}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
          onTaskMoved={onTaskMoved}
        />
      ))}

      <form
        onSubmit={handleAddTask}
        className="add-task-form"
      >
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={taskTitle}
          onChange={(event) =>
            setTaskTitle(event.target.value)
          }
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />

        <button type="submit">
          Ajouter une tâche
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}