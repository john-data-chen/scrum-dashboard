import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Todo, ToggleTodo, DeleteTodo } from "../vite-env";
import { format } from "date-fns";
import { MdDoneOutline, MdDeleteForever } from "react-icons/md";

interface TaskCardProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
}

export const Taskcard: React.FC<TaskCardProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
    >
      <Heading
        textDecoration={todo.complete ? "line-through" : "none"}
        onClick={() => toggleTodo(todo.id, todo.complete)}
      >
        {todo.title}
      </Heading>
      <Text>{todo.description}</Text>
      <Text>{format(todo.dueDate, "dd/MM/yyyy")}</Text>
      <VStack>
        <HStack>
          <Checkbox
            colorScheme="green"
            isChecked={todo.complete}
            onChange={() => toggleTodo(todo.id, todo.complete)}
          />
          <MdDoneOutline />
          <Text color="green">Complete</Text>
        </HStack>
        <HStack>
          <MdDeleteForever />
          <Button colorScheme="red" onClick={() => deleteTodo(todo.id)}>
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Taskcard;
