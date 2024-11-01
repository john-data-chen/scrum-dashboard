import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { Heading, VStack } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Delete if you like",
    dueDate: new Date(),
    complete: false,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(defaultTasks);
  const addTask = (title: string, description: string) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      dueDate: new Date(),
      complete: false,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
  };

  const toggleTodo = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
    toast.success("Updated task successfully");
  };

  const deleteTodo = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.error("Task deleted successfully");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <VStack p={100}>
        <Heading>Todo List</Heading>
        <AddTask addTodo={addTask} />
      </VStack>
      <TaskList todos={tasks} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
};

export default App;
