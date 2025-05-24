"use client";

import React, { useEffect, useMemo } from "react";

import {
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
} from "lucide-react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { returnBook } from "@/lib/actions/book";
import { toast } from "sonner";

type Props = {
  data: Array<BorrowedBook>;
};

const BorrowTable = ({ data }: Props) => {
  const columnHelper = createColumnHelper<BorrowedBook>();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReturnBook = async (borrowId: string) => {
    const res = await returnBook({ borrowId });

    if (res.success) {
      toast.success("Success", {
        description: res.message,
      });
      router.refresh();
    } else {
      toast.error("Error", {
        description: res.message,
      });
    }
  };

  const ReturnButton = ({ id }: { id: string }) => (
    <Button
      className="bg-admin text-white hover:bg-admin/80"
      onClick={() => handleReturnBook(id)}
    >
      Return
    </Button>
  );

  const ActionsCell = ReturnButton;

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.fullName, {
      id: "fullName",
      header: "User Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      header: "User Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.title, {
      id: "title",
      header: "Book Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dueDate", {
      header: "Due Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("borrowDate", {
      id: "borrowDate",
      header: "Borrowed At",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("returnDate", {
      header: "Return Date",
      cell: (info) =>
        info.getValue() ? (
          new Date(info.getValue()).toLocaleDateString()
        ) : (
          <ActionsCell id={info.cell.row.original.id} />
        ),
    }),
  ];

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const currentPageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    if (pageCount <= currentPageIndex && currentPageIndex > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [table.getState().columnFilters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg overflow-hidden border">
        <Table className="border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-secondary font-bold">
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-border/10">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      cell.column.id === "id" && "max-w-24 truncate"
                    )}
                  >
                    {cell.column.id === "status" ? (
                      <Badge
                        variant="outline"
                        className={cn(
                          cell.getValue() === "RETURNED" &&
                            "border-green-500 text-green-500",
                          cell.getValue() === "BORROWED" &&
                            "border-blue-400 text-blue-400"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Badge>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center gap-1 flex-wrap">
        <div>
          <p className="whitespace-nowrap font-semibold text-sm">
            {`Page ${table.getState().pagination.pageIndex + 1} of ${Math.max(
              1,
              table.getPageCount()
            )}`}
            &nbsp;&nbsp;
            {`[ ${table.getFilteredRowModel().rows.length} of ${
              table.getFilteredRowModel().rows.length !== 1
                ? "total results"
                : "result"
            } ]`}
          </p>
        </div>

        <div className="flex flex-row gap-1">
          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              onClick={() => router.refresh()}
              title="Refresh Data"
            >
              <RefreshCcw />
            </Button>
          </div>

          <div className="flex flex-row gap-1">
            <Button
              variant="outline"
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex - 1;
                table.setPageIndex(newIndex);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", (newIndex + 1).toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                const newIndex = table.getState().pagination.pageIndex + 1;
                table.setPageIndex(newIndex);
                const params = new URLSearchParams(searchParams.toString());
                params.set("page", (newIndex + 1).toString());
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowTable;
