"se client";
import React from "react";

import { Trash, Pencil } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CellContext } from "@tanstack/react-table";
import { TBookSchema } from "@/lib/validations";
import { deleteBook } from "@/lib/actions/book";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BooksActions = ({ row }: CellContext<TBookSchema, unknown>) => {
  const router = useRouter();

  const handleDelete = async () => {
    const bookId = row.original.id as string;
    const res = await deleteBook({ bookId });
    if (res.success) {
      toast.success("Success", {
        description: "Book deleted successfully",
      });
      router.refresh();
    } else {
      toast.error("Error", {
        description: res.message,
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/books/edit/${row.original.id}`}>
          <Pencil />
        </Link>
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-600 hover:text-red-600 hover:bg-red-100"
          >
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              book and remove data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                className="bg-destructive hover:bg-destructive/80 text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BooksActions;
