"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { X } from "lucide-react";
import { DataTableFilterField } from "@/types/data-table";
import React from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterFields?: DataTableFilterField<TData>[];
}

//* Data table toolbar component
//* show search, filter dropdown selects and reset button, view options for columns
//* table: table instance
//* filterFields: filter fields to be displayed in the toolbar e.g search filter, filter dropdown select
export function DataTableToolbar<TData>({
  table,
  filterFields,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  //* Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields
        ? filterFields.filter((field) => !field.options)
        : [],
      filterableColumns: filterFields
        ? filterFields.filter((field) => field.options)
        : [],
    };
  }, [filterFields]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <Input
                  key={String(column.value)}
                  placeholder={column.placeholder}
                  value={
                    (table
                      .getColumn(String(column.value))
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.value))
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-8 w-40 lg:w-64"
                />
              ),
          )}

        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : "") && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : "",
                  )}
                  title={column.label}
                  options={column.options ?? []}
                />
              ),
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
