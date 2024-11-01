import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Todo, ToggleTodo, DeleteTodo } from "../vite-env";

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
      <Text
        textDecoration={todo.complete ? "line-through" : "none"}
        onClick={() => toggleTodo(todo.id, todo.complete)}
      >
        {todo.title}
      </Text>
      <Box>
        <Text
          textDecoration={todo.complete ? "line-through" : "none"}
          onClick={() => toggleTodo(todo.id, todo.complete)}
        >
          {todo.description}
        </Text>
        <Text
          textDecoration={todo.complete ? "line-through" : "none"}
          onClick={() => toggleTodo(todo.id, todo.complete)}
        >
          {todo.complete ? "Completed" : "Not Completed"}
        </Text>
        <Text
          textDecoration={todo.complete ? "line-through" : "none"}
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </Text>
      </Box>
    </Box>
  );
};

export default Taskcard;
