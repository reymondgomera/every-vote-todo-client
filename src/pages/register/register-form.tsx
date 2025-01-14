import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterForm } from "@/schema/auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { handleAxiosError } from "@/lib/handleAxiosError";

//* Register form component
const RegisterForm = () => {
  const { isPending, mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterForm) => {
      const url = `${import.meta.env.VITE_API_URL}/auth/register`;
      const response = await axios.post<{ user: User }>(url, data);
      return response.data;
    },
  });

  const form = useForm<RegisterForm>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = (data: RegisterForm) => {
    mutate(data, {
      onError: (err) => handleAxiosError(err),
      onSuccess: () => {
        toast.success("Register successful");
        form.reset();
      },
    });
  };

  return (
    <div className="max-w-[400px] rounded-lg bg-white p-10 shadow-sm md:border md:border-input">
      <header className="flex flex-col items-center justify-center gap-5">
        <div className="flex size-12 flex-col items-center justify-center rounded-md border border-input shadow-sm">
          <UserPlus className="size-6 dark:text-slate-950" />
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-2xl font-extrabold dark:text-slate-950">Register</h1>
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            Join EveryVote Todo and take control of your tasks with ease!
          </p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8 space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full">
            Register
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="hover:text-primary hover:underline hover:decoration-primary">
              Login
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

export default RegisterForm;
