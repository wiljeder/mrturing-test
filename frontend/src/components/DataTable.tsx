import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Loader2 } from "lucide-react";
import { DataTablePagination } from "./DataTablePagination.tsx";
import { CustomPagination } from "@/hooks/usePagination.ts";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: CustomPagination;
  isLoading?: boolean;
  selection?: {
    rowSelection: RowSelectionState;
    onRowSelectionChange: (rowSelection: RowSelectionState) => void;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  isLoading,
  selection,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(pagination ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    manualPagination: !!pagination,
    rowCount: pagination?.rowCount,
    onRowSelectionChange: selection?.onRowSelectionChange,
    state: {
      ...(pagination ? { pagination: pagination.pagination } : {}),
      rowSelection: selection?.rowSelection,
    },
    onPaginationChange: pagination?.onPaginationChange,
  });

  // Check if row selection is enabled
  const hasRowSelection = selection !== undefined;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <Loader2 className="animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    hasRowSelection && row.getIsSelected()
                      ? "selected"
                      : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Only render pagination when it's provided */}
      {pagination && <DataTablePagination table={table} />}
    </div>
  );
}
