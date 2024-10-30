import './App.css';
import TaskList from './components/TaskList';
import { useState } from 'react';

interface Task {
  id: number;
  text: string;
}

const initialTasks: Task[] = [
  { id: 1, text: 'example task, delete me if you want' },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    const newTask : Task = {
      id: tasks.length + 1,
      text: newTaskTitle,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  return (
    <>
      <h1>Today main task</h1>
      <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList tasks={tasks} />
    </>
  );
}


export default App;