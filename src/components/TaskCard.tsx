import React from 'react';
import { Task } from '../types';
import {format} from 'date-fns';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="task-card">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-task-owner">task owner: {task.owner}</p>
      <p className="card-description">task description: {task.description}</p>
      <p className="card-status">Status: {task.status}</p>
      <p className="card-due-date">Due Date: {format(task.dueDate, 'yyyy/MM/dd')}</p>
      <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;