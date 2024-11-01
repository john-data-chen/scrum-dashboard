import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { Heading, VStack } from "@chakra-ui/react";

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
  };

  const toggleTodo = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <VStack>
        <Heading>Todo List</Heading>
        <AddTask addTodo={addTask} />
      </VStack>
      <TaskList todos={tasks} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
};

export default App;
