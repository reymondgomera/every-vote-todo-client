import { Link, useNavigate } from "react-router";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { loginSchema, type LoginForm } from "@/schema/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { useUserQuery } from "@/hooks/useUserQuery";

const LoginForm = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { data } = useUserQuery(token);

  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginForm) => {
      const url = `${import.meta.env.VITE_API_URL}/auth/login`;
      const response = await axios.post<{ token: string }>(url, data);
      return response.data;
    },
  });

  const form = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = (data: LoginForm) => {
    mutate(data, {
      onError: (err) => handleAxiosError(err),
      onSuccess: (data) => {
        toast.success("Login successful");
        form.reset();
        window.location.href = "/dashboard";
        setToken(data.token.replace("Bearer ", ""));
      },
    });
  };

  useEffect(() => {
    if (data) window.location.href = "/dashboard";
  }, [data, navigate]);

  return (
    <div className="max-w-[400px] rounded-lg bg-white p-10 shadow-sm md:border md:border-input">
      <header className="flex flex-col items-center justify-center gap-5">
        <div className="flex size-12 flex-col items-center justify-center rounded-md border border-input shadow-sm">
          <LogIn className="size-6 dark:text-slate-950" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-2xl font-extrabold dark:text-slate-950">
            Login
          </h1>
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            Securely access your EveryVote Todo account and get back to
            achieving your goals!
          </p>
        </div>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-8 space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full">
            Login
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Dont have an account?{" "}
            <Link
              to="/register"
              className="hover:text-primary hover:underline hover:decoration-primary"
            >
              Register
            </Link>
          </p>

          <Link
            to="/"
            className="inline-block w-full text-center text-xs text-muted-foreground hover:text-primary hover:underline hover:decoration-primary"
          >
            Home
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
