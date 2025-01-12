import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "@/types";

//* todo query function
const getTodos = async (token: string | null) => {
  const url = `${import.meta.env.VITE_API_URL}/todos`;
  const response = await axios.get<{ todos: Todo[] }>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) return [];

  return response.data.todos;
};

//* todo query hook for fetching todos
export const useTodosQuery = (token: string | null) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(token),
  });
};
