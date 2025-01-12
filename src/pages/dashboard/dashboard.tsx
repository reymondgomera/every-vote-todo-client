import { useAuth } from "@/hooks/useAuth";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardNav from "./dashboard-nav";
import TodoList from "./Todo/todo-list";
import { AxiosError } from "axios";
import { useTodosQuery } from "@/hooks/useTodoQuery";
import TodoListHeader from "./Todo/todo-list-header";

//* Dashboard component
const Dashboard = () => {
  const { token, setToken, setUser } = useAuth();
  const { data: userData, isSuccess, error } = useUserQuery(token);
  const { data: todoData, isLoading } = useTodosQuery(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData && isSuccess) setUser({ ...userData });
  }, [userData, isSuccess, setUser]);

  useEffect(() => {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        setToken(null);
        navigate("/login");
      }
    }
  }, [error, setToken, navigate]);

  return (
    <div className="min-h-screen flex-col">
      <DashboardNav />

      <main className="container mx-auto px-10 py-5">
        <TodoListHeader data={todoData ?? []} isLoading={isLoading} />
        <TodoList data={todoData ?? []} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Dashboard;
