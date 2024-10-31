import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { TaskFormType } from "./types";
import { Box } from "@chakra-ui/react";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskFormType[]>([]);
  const [nextId, setNextId] = useState(1);

  const addTaskHandler = (task: TaskFormType) => {
    setTasks([...tasks, { ...task, id: nextId }]);
    setNextId(nextId + 1);
  };

  const deleteTaskHandler = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Box>
      <TaskForm onAddTask={addTaskHandler} />
      <TaskList tasks={tasks} onDelete={deleteTaskHandler} />
    </Box>
  );
};

export default App;
