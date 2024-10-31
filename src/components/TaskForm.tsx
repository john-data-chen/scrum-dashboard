import { Controller, useForm } from "react-hook-form";
import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { Field } from "@/components/ui/field";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskSchema = z.object({
  id: z.number(),
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title is required"),
  owner: z
    .string({ required_error: "Owner is required" })
    .min(1, "Owner is required"),
  description: z.string().optional(),
  status: z.string({ required_error: "Status is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
});

type TaskForm = z.infer<typeof TaskSchema>;

interface TaskFormProps {
  onAddTask: (task: TaskForm) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(TaskSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onAddTask(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Field
          label="title"
          invalid={!!errors.title}
          errorText={errors.title?.message}
        >
          <Input {...register("title")} placeholder="Title" />
          {errors.title && <p>{errors.title.message}</p>}
        </Field>
      </Box>
      <Box>
        <Field
          label="owner"
          invalid={!!errors.owner}
          errorText={errors.owner?.message}
        >
          <Input {...register("owner")} placeholder="Owner" />
          {errors.owner && <p>{errors.owner.message}</p>}
        </Field>
      </Box>
      <Box>
        <Field
          label="description"
          invalid={!!errors.description}
          errorText={errors.description?.message}
        >
          <Textarea {...register("description")} placeholder="Description" />
          {errors.description && <p>{errors.description.message}</p>}
        </Field>
      </Box>
      <Field
        label="status"
        invalid={!!errors.status}
        errorText={errors.status?.message}
      >
        <NativeSelectRoot size="sm" width="240px">
          <NativeSelectField
            {...register("status")}
            placeholder="Select Status"
            items={["TO-DO", "DOING", "DONE"]}
            defaultValue={"TO-DO"}
          />
        </NativeSelectRoot>
      </Field>
      <Field
        label="dueDate"
        invalid={!!errors.dueDate}
        errorText={errors.dueDate?.message}
      >
        <Controller
          control={control}
          name="dueDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <ReactDatePicker
              selected={value || new Date()}
              onChange={onChange}
              dateFormat="yyyy/MM/dd"
              onBlur={onBlur}
              minDate={new Date()}
            />
          )}
        />
      </Field>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default TaskForm;
