import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { TaskFormType } from "../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: TaskFormType[];
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  const defaultTask: TaskFormType = {
    id: 1,
    title: "Default Task",
    owner: "John Doe",
    status: "To-Do",
    dueDate: new Date(),
    description: "This is a default task",
  };

  if (tasks.length === 0) {
    tasks = [defaultTask];
  }
  return (
    <Box>
      <Heading mb={4}>Task List</Heading>
      <Stack gap={4}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))}
      </Stack>
    </Box>
  );
};

export default TaskList;
