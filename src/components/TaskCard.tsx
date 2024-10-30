import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="task-card">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-description">task description: {task.description}</p>
      <p className="card-status">Status: {task.status}</p>
      <p className="card-due-date">Due Date: {task.dueDate.toLocaleDateString()}</p>
      <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;