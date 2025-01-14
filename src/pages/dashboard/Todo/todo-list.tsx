import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableFilterField } from "@/types/data-table";
import { Todo } from "@/types";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useMemo } from "react";

type TodoListProps = {
  data: Todo[];
  isLoading: boolean;
};

//* Todo list component
//* show todo list table
//* data: todo data
//* isLoading: loading state
const TodoList = ({ data, isLoading }: TodoListProps) => {
  const initialState = useMemo(() => {
    return {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    };
  }, []);

  const filterFields: DataTableFilterField<Todo>[] = useMemo(() => {
    return [
      {
        label: "Title",
        value: "title",
        placeholder: "Search titles...",
      },
      {
        label: "Status",
        value: "status",
        options: [
          { label: "Completed", value: "true" },
          { label: "Uncompleted", value: "false" },
        ],
      },
    ];
  }, []);

  if (isLoading) return <DataTableSkeleton columnCount={6} />;

  return (
    <DataTable initialState={initialState} filterFields={filterFields} columns={columns} data={data ?? []} />
  );
};

export default TodoList;
