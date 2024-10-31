import "./App.css";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { Task } from "./types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Center,
  Heading,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "example task",
    status: "To Do",
    dueDate: new Date(),
    owner: "me",
    description: "delete me if you want",
  },
];

interface FormInput {
  title: string;
  owner: string;
  description: string;
  status: string;
  dueDate: Date;
}
const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      title: "",
      owner: "",
      description: "",
      status: "To Do",
      dueDate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const newTask = {
      id: tasks.length + 1,
      title: data.title,
      owner: data.owner,
      description: data.description,
      status: data.status,
      dueDate: data.dueDate,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully");
    reset();
  };

  const handleDeleteTask = (taskId: number) => {
    toast.promise(
      new Promise((resolve) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this task?"
        );
        if (confirmDelete) {
          const newTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(newTasks);
          resolve(true);
        } else {
          resolve(false);
        }
      }),
      {
        pending: "Deleting task...",
        success: {
          render({ data }) {
            if (data) {
              return "Task deleted successfully";
            } else {
              return "Cancel deleting task";
            }
          },
        },
        error: "Error deleting task",
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <Box
        className="App"
        bg="green.900"
        color="white"
        minHeight="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Center>
          <VStack align="stretch">
            <Heading mb={4}>Task List</Heading>
            <HStack justify="flex-end">
              <Text textAlign={"left"}>Title: </Text>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input type="text" {...field} placeholder="Title" />
                )}
              />
              {errors.title?.message && <Text>{errors.title.message}</Text>}
            </HStack>
            <HStack justify="flex-end">
              <Text mb={1}>Owner: </Text>
              <Controller
                name="owner"
                control={control}
                render={({ field }) => (
                  <input type="text" {...field} placeholder="Task Owner" />
                )}
              />
              {errors.owner?.message && <Text>{errors.owner.message}</Text>}
            </HStack>
            <HStack justify="flex-end">
              <Text mb={1}>Description: </Text>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <textarea {...field} placeholder="Description" />
                )}
              />
            </HStack>
            <HStack justify="flex-end">
              <Text mb={1}>Status: </Text>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                )}
              />
            </HStack>
            <HStack justify="flex-end">
              <Text mb={1}>Due Date: </Text>
              <Controller
                name="dueDate"
                control={control}
                render={({ field }) => (
                  <ReactDatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy/MM/dd"
                  />
                )}
              />
            </HStack>
            <Button
              colorScheme="teal"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </VStack>
        </Center>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
        <Center>
          <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </Center>
      </Box>
    </>
  );
};

export default App;
