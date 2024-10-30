interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: Date;
}

export type { Task };