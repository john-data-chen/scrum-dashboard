import React from "react";
import { TaskFormType } from "../types";
import { Box, Flex, Text, Badge, Button } from "@chakra-ui/react";

interface TaskCardProps {
  task: TaskFormType;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <Box bg="white" borderRadius="lg" p={4} boxShadow="md" mb={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize="lg" fontWeight="bold">
          {task.title}
        </Text>
        <Badge colorScheme="green" variant="solid">
          {task.status}
        </Badge>
      </Flex>
      <Text fontSize="md" mb={2}>
        {task.description}
      </Text>
      <Text fontSize="sm" color="gray.500">
        Due Date: {task.dueDate.toLocaleDateString()}
      </Text>
      <Button
        colorScheme="red"
        variant="solid"
        size="sm"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </Box>
  );
};

export default TaskCard;
