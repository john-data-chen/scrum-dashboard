/// <reference types="vite/client" />
interface Todo {
  id: number;
  title: string;
  description: string;
  complete: boolean;
}



type ToggleTodo = (id : number, complete: boolean) => void;

type AddTodo = (title: string, description: string, complete: boolean) => void;

type DeleteTodo = (id: number) => void;

export { Todo, ToggleTodo, AddTodo, DeleteTodo };
