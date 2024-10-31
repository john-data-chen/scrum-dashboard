interface TaskFormType {
  id: number;
  title: string;
  description?: string;
  owner: string;
  status: string;
  dueDate: Date;
}

export type { TaskFormType };
