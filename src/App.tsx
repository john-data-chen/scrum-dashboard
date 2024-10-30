import './App.css';
import TaskList from './components/TaskList';
import { useState } from 'react';
import { Task } from './types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialTasks: Task[] = [
  { id: 1, title: 'example task', status: 'todo', dueDate: new Date(), description: 'delete me if you want' },
];

interface FormInput {
  assignee: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      description: data.description,
      status: data.status,
      dueDate: new Date(data.dueDate),
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId: number) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.warning('Task deleted successfully!')
  };

  return (
    <>
      <h1>Today main task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title (required)</label>
        <input
          {...register('title', { required: true })}
          placeholder="Enter task title"
          required
          id = "title"
        />
        {errors.title?.message && <p>{errors.title.message}</p>}
        <label htmlFor="assignee">Assignee</label>
        <input
          {...register('assignee')}
          placeholder="Enter assignee"
        />
        <label htmlFor="description">Description</label>
        <textarea
          {...register('description')}
          placeholder="Enter description"
        />
        <label htmlFor="status">Status</label>
        <select {...register('status')}>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <label htmlFor="priority">Due Date</label>
        <input
          {...register('dueDate')}
          type="date"
          placeholder="Enter due date"
        />
        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} onDelete={handleDeleteTask}/>
      <ToastContainer />
    </>
  );
}


export default App;