type Env = {
  SECRET_KEY: string;
  EXPIRE_TIME: number;
  API_URL: string;
};

export const mockEnv: Env = {
  SECRET_KEY: "todo_list",
  EXPIRE_TIME: 3600,
  API_URL: "http://localhost:8000/api/v1",
};
