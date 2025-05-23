"use client";

import React, { useEffect, useMemo } from "react";

import { RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import UserStatus from "./user-status";
import UserRole from "./user-role";

const UsersTable = ({ users }: { users: IUser[] }) => {
  const columnHelper = createColumnHelper<IUser>();
  const columnsHeadersArray: Array<keyof IUser> = [
    "id",
    "fullName",
    "email",
    "role",
    "status",
    "universityId",
    "lastActivityDate",
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const columns = [
    ...columnsHeadersArray.map((column) => {
      return columnHelper.accessor(column, {
        id: column,
        header: column[0].toUpperCase() + column.slice(1),
      });
    }),
  ];

  const pageIndex = useMemo(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) - 1 : 0;
  }, [searchParams]);

  const table = useReactTable({
    data: users,
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
                      cell.column.id === "id" && "max-w-32",
                      "truncate border"
                    )}
                  >
                    {cell.column.id === "status" ? (
                      <UserStatus
                        id={cell.row.original.id}
                        status={cell.getValue() as string}
                      />
                    ) : cell.column.id === "role" ? (
                      <UserRole
                        id={cell.row.original.id}
                        role={cell.getValue() as "ADMIN" | "USER"}
                      />
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

export default UsersTable;
