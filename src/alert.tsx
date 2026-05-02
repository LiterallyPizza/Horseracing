import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Race } from "@/lib/races";
import { Button } from "@/components/ui/button";

interface Props {
  races: Race[];
  globalFilter: string;
  setGlobalFilter: (v: string) => void;
}

export const RacesTable = ({ races, globalFilter }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Race>[]>(
    () => [
      { accessorKey: "date", header: "Date" },
      { accessorKey: "course", header: "Course" },
      { accessorKey: "distance", header: "Distance" },
      { accessorKey: "horse", header: "Horse" },
      { accessorKey: "jockey", header: "Jockey" },
      { accessorKey: "trainer", header: "Trainer" },
      {
        accessorKey: "position",
        header: "Pos",
        cell: ({ getValue }) => {
          const v = getValue<number | null>();
          if (v === 1)
            return (
              <span className="inline-flex items-center justify-center rounded-md gradient-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                1st
              </span>
            );
          return <span className="font-medium">{v ?? "—"}</span>;
        },
      },
      { accessorKey: "odds", header: "Odds" },
    ],
    []
  );

  const table = useReactTable({
    data: races,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
    globalFilterFn: "includesString",
  });

  return (
    <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap"
                  >
                    {h.isPlaceholder ? null : (
                      <button
                        className="inline-flex items-center gap-1 hover:text-primary transition"
                        onClick={h.column.getToggleSortingHandler()}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        <ArrowUpDown className="h-3 w-3 opacity-60" />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No races match your search.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-border hover:bg-muted/40 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
        <div className="text-muted-foreground">
          Showing {table.getRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} races
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
