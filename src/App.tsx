import "./App.css";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { Task } from "./types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "example task",
    status: "To Do",
    dueDate: new Date(),
    owner: "me",
    description: "delete me if you want",
  },
];

interface FormInput {
  title: string;
  owner: string;
  description: string;
  status: string;
  dueDate: Date;
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const { handleSubmit, control, reset } = useForm<FormInput>({
    defaultValues: {
      title: "",
      owner: "",
      description: "",
      status: "To Do",
      dueDate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      owner: data.owner,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
    reset();
  };

  const handleDeleteTask = (taskId: number) => {
    toast.promise(
      new Promise((resolve) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this task?"
        );
        if (confirmDelete) {
          const newTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(newTasks);
          resolve(true);
        } else {
          resolve(false);
        }
      }),
      {
        pending: "Deleting task...",
        success: {
          render({ data }) {
            if (data) {
              return "Task deleted successfully";
            } else {
              return "Cancel deleting task";
            }
          },
        },
        error: "Error deleting task",
      }
    );
  };

  return (
    <>
      <h1>Today main task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title (required)</label>
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <input {...field} />}
        />
        <label htmlFor="owner">Task Owner</label>
        <Controller
          name="owner"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        <label htmlFor="status">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <select {...field}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          )}
        />
        <label htmlFor="dueDate">Due Date</label>
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <ReactDatePicker
              selected={value}
              onChange={onChange}
              dateFormat="yyyy/MM/dd"
              onBlur={onBlur}
              minDate={new Date()}
            />
          )}
        />

        <button type="submit">Add Task</button>
      </form>
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      <ToastContainer />
    </>
  );
}

export default App;
