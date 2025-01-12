export type Theme = "dark" | "light";

export type User = {
  uuid: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Todo = {
  uuid: string;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
};
