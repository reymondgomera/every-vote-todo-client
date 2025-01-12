import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types";

const getUser = async (token: string | null) => {
  const url = `${import.meta.env.VITE_API_URL}/auth/me`;
  const response = await axios.get<{ user: User }>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) return null;

  return response.data.user;
};

export const useUserQuery = (token: string | null) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token),
  });
};
