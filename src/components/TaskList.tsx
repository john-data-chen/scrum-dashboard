import { Taskcard } from "./TaskCard";
import { CheckboxGroup } from "@chakra-ui/react";
import { Todo, ToggleTodo, DeleteTodo } from "../vite-env";

interface TaskListProps {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  deleteTodo: DeleteTodo;
}

export const TaskList: React.FC<TaskListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <CheckboxGroup>
      {todos.map((todo) => (
        <Taskcard
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </CheckboxGroup>
  );
};

export default TaskList;
