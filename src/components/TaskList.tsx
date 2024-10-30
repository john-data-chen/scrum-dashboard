import React from 'react';
import { Task } from '../types';
import TaskCard  from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;