import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Todo } from "@/types";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { RowAction } from "./row-action";

//* Todo list columns
export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="font-medium' max-w-[28rem] truncate">
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <>{row.original.description}</>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status ? "success" : "destructive"}>
          {status ? "Completed" : "Uncompleted"}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const value = String(row.getValue(columnId));
      if (!filterValue || filterValue.length < 1) return true;
      return filterValue.includes(value);
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => <>{format(new Date(row.original.dueDate), "PP")}</>,
  },
  {
    accessorKey: "createdAt",
    enableSorting: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => <>{format(new Date(row.original.createdAt), "PPp")}</>,
  },
  {
    id: "actions",
    size: 40,
    cell: (options) => <RowAction {...options} />,
  },
];
