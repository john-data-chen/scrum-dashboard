import { useState } from "react";
import { AddTodo } from "../vite-env";
import { Input, Button, HStack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface AddTaskProps {
  addTodo: AddTodo;
}

const AddTask: React.FC<AddTaskProps> = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(title, description, dueDate);
    setTitle("");
    setDescription("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          selected={dueDate}
          onChange={(date) => date && setDueDate(date)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          placeholderText="Due Date"
        />
        <Button type="submit">Add</Button>
      </HStack>
    </form>
  );
};

export default AddTask;
