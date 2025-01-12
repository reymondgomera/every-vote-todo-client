import axios from "axios";
import { useMemo } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/useAuth";
import { type TodoForm, todoSchema } from "@/schema/todo";
import { Todo } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { handleAxiosError } from "@/lib/handleAxiosError";
import { paramsSchema } from "@/schema/common";

type TodoFormProps = {
  data?: Todo;
  handleClose: () => void;
};

//* Todo form component
//* show todo form to create or update todo
//* data: todo data
//* handleClose: function to close the form popup
const TodoForm = ({ data, handleClose }: TodoFormProps) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const isEdit = useMemo(() => !!data, [data]);

  const { isPending, mutate } = useMutation({
    mutationKey: ["create-update", "todo"],
    mutationFn: async (formData: TodoForm) => {
      if (!isEdit) {
        const url = `${import.meta.env.VITE_API_URL}/todos`;
        const response = await axios.post<{ todo: Todo }>(url, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      }

      const url = `${import.meta.env.VITE_API_URL}/todos/${data?.uuid}`;
      const response = await axios.put<{ todo: Todo }>(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
  });

  const defaultValues: TodoForm = useMemo(() => {
    if (data) return { ...data, dueDate: new Date(data.dueDate) };

    return {
      title: "",
      description: "",
      status: false,
      dueDate: new Date(),
    };
  }, [data]);

  const form = useForm<TodoForm>({
    defaultValues,
    resolver: zodResolver(
      !isEdit ? todoSchema : todoSchema.merge(paramsSchema),
    ),
    mode: "onChange",
  });

  const handleSubmit = (formData: TodoForm) => {
    mutate(formData, {
      onError: (err) => handleAxiosError(err),
      onSuccess: ({ todo }) => {
        toast.success(`Todo ${isEdit ? "updated" : "created"} successfully"`);
        form.reset();
        handleClose();

        //* only update cache not to totally refetch the data from the server
        if (!isEdit) {
          queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
            if (!oldTodos || oldTodos.length < 1) return [todo];
            console.log("oldtodos =", oldTodos);
            console.log([todo, ...oldTodos]);
            return [todo, ...oldTodos];
          });
          return;
        }

        queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
          if (!oldTodos || oldTodos.length < 1) return [todo];
          return oldTodos.map((oldTodo) => {
            if (todo.uuid === oldTodo.uuid) {
              return { ...oldTodo, ...todo };
            }
            return oldTodo;
          });
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        id="todo-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value ?? new Date())}
                    onSelect={field.onChange}
                    disabled={(date: Date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); //* Reset time to midnight
                      return date < today; //* Only disable dates before today
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button form="todo-form" disabled={isPending} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TodoForm;
