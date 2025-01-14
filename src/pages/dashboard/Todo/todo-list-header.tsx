import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Todo } from "@/types";
import { CircleCheck, CircleX, Hash, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import TodoForm from "./todo-form";

type TodoListHeaderProps = {
  data: Todo[];
  isLoading: boolean;
};

//* Todo list header component
//* show total, completed, uncompleted count
//* data: todo data
//* isLoading: loading state
const TodoListHeader = ({ data, isLoading }: TodoListHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const total = useMemo(() => data.length, [data]);
  const completed = useMemo(( )=> data.filter(todo => todo.status).length, [data]); // prettier-ignore
  const uncompleted = useMemo(() => total - completed, [total, completed]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <header className="mb-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Skeleton className="h-[61px] sm:w-[99px]" />
          <Skeleton className="h-[61px] sm:w-[99px]" />
          <Skeleton className="h-[61px] sm:w-[99px]" />
        </div>

        <Skeleton className="auto h-[36px] sm:w-[132px]" />
      </header>
    );
  }

  return (
    <>
      <header
        aria-label="todo-list-header"
        className="mb-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Card className="col-span-1 flex items-center gap-3 rounded-md p-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
              <Hash className="size-4.5 text-primary" />
            </div>
            <div className="flex flex-col">
              <h1 aria-label="total-todo" className="text-sm font-bold">
                {total}
              </h1>
              <p aria-label="total-todo-label" className="text-xs text-muted-foreground">
                Total
              </p>
            </div>
          </Card>

          <Card className="col-span-1 flex items-center gap-3 rounded-md p-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-green-500/10">
              <CircleCheck className="size-4.5 text-green-500" />
            </div>
            <div className="flex flex-col">
              <h1 aria-label="completed-todo" className="text-sm font-bold">
                {completed}
              </h1>
              <p aria-label="completed-todo-label" className="text-xs text-muted-foreground">
                Completed
              </p>
            </div>
          </Card>

          <Card className="col-span-1 flex items-center gap-3 rounded-md p-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-destructive/10">
              <CircleX className="size-4.5 text-destructive" />
            </div>
            <div className="flex flex-col">
              <h1 aria-label="uncompleted-todo" className="text-sm font-bold">
                {uncompleted}
              </h1>
              <p aria-label="uncompleted-todo-label" className="text-xs text-muted-foreground">
                UnCompleted
              </p>
            </div>
          </Card>
        </div>

        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4" />
          Create Todo
        </Button>
      </header>

      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent data-testid="create-todo-dialog">
            <DialogHeader>
              <DialogTitle>Create Todo</DialogTitle>
              <DialogDescription>Create a new todo task to get things done.</DialogDescription>
            </DialogHeader>
            <TodoForm handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TodoListHeader;
