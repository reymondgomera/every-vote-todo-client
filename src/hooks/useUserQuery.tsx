import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "@/types";

//* current user query function
const getUser = async (token: string | null) => {
  const url = `${import.meta.env.VITE_API_URL}/auth/me`;
  const response = await axios.get<{ user: User }>(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) return null;

  return response.data.user;
};

//* current user query hook for fetching current user
export const useUserQuery = (token: string | null) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(token),
  });
};
