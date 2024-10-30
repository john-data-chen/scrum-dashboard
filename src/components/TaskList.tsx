import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-item" key={task.id}>
          <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
          <span>{task.title}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;