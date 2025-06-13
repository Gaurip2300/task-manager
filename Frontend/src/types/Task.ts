export type Priority = "low" | "medium" | "high";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}