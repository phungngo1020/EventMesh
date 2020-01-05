// Task model
export class Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdDate: string;
  dueDate: string;
  completed: boolean;
}
