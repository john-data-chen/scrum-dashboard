import React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { TaskFormType } from "../types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: TaskFormType[];
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
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
