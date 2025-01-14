export type User = {
  uuid: string;
  username: string;
  email: string;
  password: string;
  create_at: string;
  update_at: string;
  deleted_at: string | null;
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
  user_uuid: string;
};

const users: User[] = [
  {
    uuid: "c915b88b-c3f3-471e-8d51-b358e8a12dd7",
    username: "test-user-1",
    email: "test-user-1@example.com",
    password: "12345",
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    uuid: "c915b88b-c3f3-471e-8d51-b358e8a12dd8",
    username: "test-user-2",
    email: "test-user-2@example.com",
    password: "12345",
    create_at: new Date().toISOString(),
    update_at: new Date().toISOString(),
    deleted_at: null,
  },
];

const todos: Todo[] = [
  {
    uuid: "b606c9fb-6e4b-4c64-8301-07ed0fbaf40a",
    title: "test-todo-1",
    description: "test-todo-1 description",
    status: true,
    dueDate: "2023-10-01",
    createdAt: new Date("2024-01-14").toISOString(),
    updatedAt: new Date("2024-01-14").toISOString(),
    deletedAt: null,
    user_uuid: "c915b88b-c3f3-471e-8d51-b358e8a12dd7",
  },
  {
    uuid: "b606c9fb-6e4b-4c64-8301-07ed0fbaf40b",
    title: "test-todo-2",
    description: "test-todo-2 description",
    status: false,
    dueDate: "2023-10-01",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
    deletedAt: null,
    user_uuid: "c915b88b-c3f3-471e-8d51-b358e8a12dd7",
  },
  {
    uuid: "b606c9fb-6e4b-4c64-8301-07ed0fbaf40b",
    title: "test-todo-3",
    description: "test-todo-3 description",
    status: false,
    dueDate: "2023-10-01",
    createdAt: new Date("2024-01-16").toISOString(),
    updatedAt: new Date("2024-01-16").toISOString(),
    deletedAt: null,
    user_uuid: "c915b88b-c3f3-471e-8d51-b358e8a12dd7",
  },
  {
    uuid: "b606c9fb-6e4b-4c64-8301-07ed0fbaf41b",
    title: "test-todo-4",
    description: "test-todo-4 description",
    status: false,
    dueDate: "2023-10-01",
    createdAt: new Date("2024-01-18").toISOString(),
    updatedAt: new Date("2024-01-18").toISOString(),
    deletedAt: null,
    user_uuid: "c915b88b-c3f3-471e-8d51-b358e8a12dd8",
  },
];

export const mockData = { users, todos };
