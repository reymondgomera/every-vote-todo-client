import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { CellContext } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TodoForm from "./todo-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Todo } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { handleAxiosError } from "@/lib/handleAxiosError";

export const RowAction = ({ row }: CellContext<Todo, unknown>) => {
  const rowData = row.original;

  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowConfirmation, setIsShowConfirmation] = useState(false);

  const { mutate: updateStatusMutate, isPending: updateStatusIsPending } =
    useMutation({
      mutationKey: ["update-status", "todo"],
      mutationFn: async (data: Todo) => {
        const url = `${import.meta.env.VITE_API_URL}/todos/${data.uuid}`;
        const response = await axios.put<{ todo: Todo }>(url, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      },
    });

  const { mutate: deleteTodoMutate, isPending: deleteTodoIsPending } =
    useMutation({
      mutationKey: ["delete", "todo"],
      mutationFn: async (id: string) => {
        const url = `${import.meta.env.VITE_API_URL}/todos/${id}`;
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return id;
      },
    });

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleCloseConfirmation = () => {
    setIsShowConfirmation(false);
  };

  const toggleStatus = () => {
    updateStatusMutate(
      { ...rowData, status: !rowData.status },
      {
        onError: (err) => handleAxiosError(err),
        onSuccess: ({ todo }) => {
          toast.success(
            `Todo marked as ${todo.status ? '"COMPLETED"' : '"UNCOMPLETED"'}`,
          );
          handleCloseForm();

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
      },
    );
  };

  const handleDelete = () => {
    deleteTodoMutate(rowData.uuid, {
      onError: (err) => handleAxiosError(err),
      onSuccess: (id) => {
        toast.success("Deleted Todo successfully");
        handleCloseConfirmation();
        queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) => {
          if (!oldTodos || oldTodos.length < 1) return [];
          console.log(
            "without deleted todo",
            oldTodos.filter((todo) => todo.uuid !== id),
          );
          return oldTodos.filter((todo) => todo.uuid !== id);
        });
      },
    });
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex size-8 p-0 data-[state=open]:bg-muted"
            variant="ghost"
            size="icon"
          >
            <Ellipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-50" align="end">
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={updateStatusIsPending}
            onClick={toggleStatus}
          >
            Mark as {!rowData.status ? '"COMPLETED"' : '"UNCOMPLETED"'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsShowConfirmation(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Todo</DialogTitle>
              <DialogDescription>
                Update the todo task to get things done.
              </DialogDescription>
            </DialogHeader>
            <TodoForm handleClose={handleCloseForm} data={rowData} />
          </DialogContent>
        </Dialog>
      )}

      {isShowConfirmation && (
        <AlertDialog
          open={isShowConfirmation}
          onOpenChange={setIsShowConfirmation}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this todo entitled{""}
                <span className="font-bold"> {rowData.title}</span>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseConfirmation}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={deleteTodoIsPending}
                onClick={handleDelete}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
